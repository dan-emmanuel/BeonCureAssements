import { Table, TableTitleAndIndex, TablesData } from "./Table.type";

export interface IContentStrategy {
  processContent(content: TablesData): TableTitleAndIndex[] | Table;
}


