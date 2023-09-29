import { IContentStrategy } from "./IcontentStrategy";
import { TablesData } from "./Table.type";

export class TableInfoStrategy implements IContentStrategy {
  constructor(private tableIndex: number) { }

  processContent(content: TablesData) {
    if (content.tables && content.tables[this.tableIndex]) {
      return content.tables[this.tableIndex];
    } else {
      throw new Error('Table not found');
    }
  }
}
