import { format } from "date-fns";

export function formatDate(date: Date): string {
  return format(new Date(date), "dd/MM/yy");
}

export function formatNumber(number: number): string {
  const fixedDecimal = number.toFixed(2);

  return parseFloat(fixedDecimal).toLocaleString();
}
