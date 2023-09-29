export type Table = {
  title: string;
  rows: number;
  columns: number;
  notes: string;
}

export type TablesData = {
  tables: Table[];
}

export type TableTitleAndIndex = {
  title: string;
  id: number;
}

