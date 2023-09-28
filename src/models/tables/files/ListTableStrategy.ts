import { IContentStrategy } from "./IcontentStrategy";
import { TablesData } from "./Table.type";

export class ListTablesStrategy implements IContentStrategy {
  processContent(content: TablesData) {
    return content.tables.map(({ title }, id) => ({ title, id }));
  }
}
