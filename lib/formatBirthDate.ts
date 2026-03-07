/**
 * 숫자만 추출 (8자리: YYYYMMDD)
 */
export function toBirthDateDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, 8);
}

/**
 * 입력 중 표시용: 19950101 → 1995년 01월 01일
 */
export function formatBirthDate(value: string): string {
  const digits = toBirthDateDigits(value);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6)
    return `${digits.slice(0, 4)}년 ${digits.slice(4, 6)}월`;
  return `${digits.slice(0, 4)}년 ${digits.slice(4, 6)}월 ${digits.slice(6, 8)}일`;
}

/**
 * 생년월일 유효성 검사 (YYYYMMDD)
 * - 연도: 1900 ~ (현재년도 - 10)
 * - 월: 1~12
 * - 일: 해당 월의 유효한 일수
 */
export function isValidBirthDate(digits: string): boolean {
  if (digits.length !== 8 || !/^\d{8}$/.test(digits)) return false;
  const y = parseInt(digits.slice(0, 4), 10);
  const m = parseInt(digits.slice(4, 6), 10);
  const d = parseInt(digits.slice(6, 8), 10);
  if (m < 1 || m > 12) return false;
  const maxYear = new Date().getFullYear() - 10;
  if (y < 1900 || y > maxYear) return false;
  const lastDay = new Date(y, m, 0).getDate();
  return d >= 1 && d <= lastDay;
}
