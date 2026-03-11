import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";
import { toBirthDateDigits, padToEightDigits, isValidBirthDate } from "@/lib/formatBirthDate";
import { toPhoneDigits } from "@/lib/formatPhone";

type ApplyBody = {
  name: string;
  birthDate: string;
  phone: string;
  gender: string;
};

async function sendDiscordNotification(data: {
  name: string;
  birth_date: string;
  phone: string;
  gender: string;
}) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const embed = {
    title: "새 프로모션 신청",
    fields: [
      { name: "이름", value: data.name, inline: true },
      { name: "생년월일", value: data.birth_date, inline: true },
      { name: "휴대폰", value: data.phone, inline: true },
      { name: "성별", value: data.gender, inline: true },
    ],
    timestamp: new Date().toISOString(),
  };

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ embeds: [embed] }),
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ApplyBody;

    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (!name) {
      return NextResponse.json({ error: "이름을 입력해주세요." }, { status: 400 });
    }

    const birthDigits = toBirthDateDigits(body.birthDate ?? "");
    const birthNormalized = padToEightDigits(birthDigits);
    if (!birthDigits) {
      return NextResponse.json({ error: "생년월일을 입력해주세요." }, { status: 400 });
    }
    if (!isValidBirthDate(birthNormalized)) {
      return NextResponse.json(
        { error: "올바른 생년월일을 입력해주세요. (예: 1995년 11월 15일)" },
        { status: 400 }
      );
    }

    const phoneDigits = toPhoneDigits(body.phone ?? "");
    if (!phoneDigits) {
      return NextResponse.json({ error: "휴대폰 번호를 입력해주세요." }, { status: 400 });
    }
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      return NextResponse.json(
        { error: "휴대폰 번호를 올바르게 입력해주세요." },
        { status: 400 }
      );
    }

    if (!["남", "여"].includes(body.gender)) {
      return NextResponse.json({ error: "성별을 선택해주세요." }, { status: 400 });
    }

    const supabase = createClient();
    const { error } = await supabase.from("user_info_landing").insert({
      name,
      birth_date: birthNormalized,
      phone: phoneDigits,
      gender: body.gender as "남" | "여",
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "이미 신청하셨습니다." },
          { status: 409 }
        );
      }
      throw error;
    }

    await sendDiscordNotification({
      name,
      birth_date: birthNormalized,
      phone: phoneDigits,
      gender: body.gender,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Apply API error:", err);
    return NextResponse.json(
      { error: "신청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
