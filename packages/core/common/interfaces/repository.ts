export interface Repository<T> {
  findOne(id: any): Promise<T>;
  findAll(): Promise<T[]>;
  create(id: any, item: T): Promise<T>;
  update(id: any, item: T): Promise<void>;
  destroy(id: any): Promise<void>;
}
