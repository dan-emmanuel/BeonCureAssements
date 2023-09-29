import { Request, Response } from 'express';
import services from 'utils/services';
import { ReaderFactory, ReadersTypes } from 'models/tables/ReaderFactory';
import path from 'path';
import { ListTablesStrategy } from 'models/tables/files/ListTableStrategy';
import { TableInfoStrategy } from 'models/tables/files/TableInfoStrategy'; // Assuming you have this imported

export class FileController {
    private logger = services.getLogger('FileController');
    private folderPath = path.join(__dirname, '..', '..', 'data', 'tables');
    private readerFactory = new ReaderFactory();

    public listFiles = async (req: Request, res: Response): Promise<void> => {
        try {
            const folderReader = this.readerFactory.createReader(ReadersTypes.FOLDER, this.folderPath);
            const files = folderReader.content;
            res.json(files);
        } catch (error) {
            this.logger.error({ message: `Unable to read folder: ${'folder'}`, error: error });
            res.status(500).send("Failed to list files.");
        }
    };

    public listTables = async (req: Request, res: Response): Promise<void> => {
        const fileName = req.params.fileName;
        try {
            const reader = this.readerFactory.createReader(ReadersTypes.FILE, `${this.folderPath}/${fileName}.json`, ListTablesStrategy);
            res.json(reader.content);
        } catch (error) {
            this.logger.error({ message: `Unable to read file: ${fileName}`, error: error });
            res.status(500).send("Failed to list tables.");
        }
    };

    public getTableInfo = async (req: Request, res: Response): Promise<void> => {
        const fileName = req.params.fileName;
        const tableIndex = parseInt(req.params.tableIndex, 10);
        try {
            const reader = this.readerFactory.createReader(ReadersTypes.FILE, `${this.folderPath}/${fileName}.json`, TableInfoStrategy, tableIndex);
            res.json(reader.content);
        } catch (error) {
            this.logger.error({ message: `Failed to fetch table info for file: ${fileName}, table index: ${tableIndex}`, error: error });
            res.status(500).send("Failed to fetch table info.");
        }
    }
}
