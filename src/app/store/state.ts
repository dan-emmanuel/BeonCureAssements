export interface Table {
  title: string;
  rows: number;
  columns: number;
  notes: string;
}

export type TableTitleAndIndex = {
  title: string;
  id: number;
}
export interface AppState {
  files: string[];
  tables: TableTitleAndIndex[];
  table?: Table;
}