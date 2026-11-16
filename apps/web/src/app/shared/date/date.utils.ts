/** ISO datetime from the API (`2026-03-12T00:00:00.000Z`) → date input value (`2026-03-12`). */
export function toDateInputValue(isoDateTime: string): string {
  return isoDateTime.slice(0, 10);
}

/** Today's date in the user's timezone as a date input value. */
export function todayDateInputValue(): string {
  const now: Date = new Date();
  const month: string = String(now.getMonth() + 1).padStart(2, '0');
  const day: string = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

/** Date input value (`2026-03-12`) → ISO datetime at UTC midnight (`2026-03-12T00:00:00.000Z`). */
export function toIsoDateTime(dateInputValue: string): string {
  return new Date(`${dateInputValue}T00:00:00.000Z`).toISOString();
}
