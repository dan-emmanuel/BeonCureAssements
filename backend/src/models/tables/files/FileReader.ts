import fs from 'fs';
import { IReader } from '../IReader';
import { IContentStrategy } from './IcontentStrategy';
import { TablesData } from './Table.type';

export class FileReader implements IReader {
  private filePath: string;
  private readStrategy: IContentStrategy;
  constructor(filePath: string, readStrategy: new (fileIndex?:number)=>IContentStrategy,fileIndex?:number) {
    this.filePath = filePath;
    this.readStrategy = new readStrategy(fileIndex)
  }
  read(): TablesData {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
  }
  get content() {
    return this.readStrategy.processContent(this.read())
  }
}
