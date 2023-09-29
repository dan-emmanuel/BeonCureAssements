export interface Table {
  title: string;
  rows: number;
  columns: number;
  notes: string;
}

export interface AppState {
  files: string[];
  tables: Table[];
}