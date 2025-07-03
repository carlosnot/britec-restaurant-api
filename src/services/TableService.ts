import { TableRepository } from "../repositories/TableRepository";
import { Table } from "../types/table";

export class TableService {
  private readonly tableRepository: TableRepository;

  constructor() {
    this.tableRepository = new TableRepository();
  }

  async getClosedTables(): Promise<Table[]> {
    return this.tableRepository.getClosed();
  }

  async getOpenedTables(): Promise<Table[]> {
    return this.tableRepository.getOpened();
  }

  async checkTableStatusById(tableId: number): Promise<Table[] | null> {
    return this.tableRepository.checkStatusById(tableId);
  }
}
