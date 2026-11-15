export interface PropertyListItem {
  readonly label: string;
  /** Already formatted value; `undefined` renders the list's `emptyValue`. */
  readonly value: string | undefined;
  readonly icon?: string;
}
