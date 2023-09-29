import fs from 'fs';
import { IReader } from './IReader';

export class FolderReader implements IReader {
  private folderPath: string;

  constructor(folderPath: string) {
    this.folderPath = folderPath;
  }

  read(): string[] {
    return fs.readdirSync(this.folderPath);
  }
  get content() { 
    return this.read().map((file: string) => file.split('.')[0])
  } 
}
