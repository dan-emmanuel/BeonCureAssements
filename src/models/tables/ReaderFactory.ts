import { IReader } from './IReader';
import { FolderReader } from './FolderReader';
import { FileReader } from './files/FileReader';
import path from 'path';
import { IContentStrategy } from './files/IcontentStrategy';

export enum ReadersTypes {
  FOLDER="FOLDER",
  FILE = "FILE"
}

type ReaderTypeMap = {
  [ReadersTypes.FOLDER]: FolderReader;
  [ReadersTypes.FILE]: FileReader;
};


export class ReaderFactory {
  private static readonly readerMappings: {
    [key in ReadersTypes]?: (
      pathStr: string,
      ParseStrategyClass: new (tableIndex?: number) => IContentStrategy,
      tableIndex?: number
    ) => IReader;
  } = {
      [ReadersTypes.FOLDER]: (pathStr) => new FolderReader(pathStr),
      [ReadersTypes.FILE]: (pathStr, ParseStrategyClass, tableIndex) => {
        if (path.extname(pathStr) !== '.json') {
          throw new Error('Only JSON files are supported');
        }
        return new FileReader(pathStr, ParseStrategyClass, tableIndex);
      }
    };

  createReader<T extends ReadersTypes>(
    type: T,
    relativePath: string,
    ParseStrategyClass?: new (tableIndex?: number) => IContentStrategy,
    tableIndex?: number
  ): ReaderTypeMap[T] {
    const absolutePath = path.resolve(__dirname, '..', '..', relativePath);
    const readerCreator = ReaderFactory.readerMappings[type];
    if (!readerCreator) {
      throw new Error('Invalid reader type');
    }
    return readerCreator(absolutePath, ParseStrategyClass, tableIndex) as ReaderTypeMap[T];
  }
}


