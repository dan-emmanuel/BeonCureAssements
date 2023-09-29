import { Table, TableTitleAndIndex, TablesData } from "./files/Table.type";

type ContentType = string[] | TableTitleAndIndex[] | Table


export interface IReader {
  read(): string[] | TablesData;
  get content(): ContentType
}
