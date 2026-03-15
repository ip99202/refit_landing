import LandingPage from "@/components/landing/LandingPage";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fffcf9]">
      <main>
        <LandingPage />
      </main>
    </div>
  );
}
