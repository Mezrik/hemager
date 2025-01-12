import { plainToInstance } from 'class-transformer';
import { Repository } from 'common/interfaces';
import { Attributes } from 'sequelize';
import { Model, Sequelize, Repository as DbRepository } from 'sequelize-typescript';

export class BaseRepository<T extends Model, U> implements Repository<U> {
  private _dbRepo: DbRepository<T>;
  private _entity: new () => U;

  constructor(db: Sequelize, model: new () => T, entity: new () => U) {
    this._dbRepo = db.getRepository(model);
    this._entity = entity;
  }

  async findOne(id: any): Promise<U> {
    return plainToInstance(this._entity, await this._dbRepo.findByPk(id));
  }

  async findAll(): Promise<U[]> {
    return await this._dbRepo
      .findAll()
      .then((items) => items.map((item) => plainToInstance(this._entity, item)));
  }

  async create(id: any, item: Attributes<T>): Promise<U> {
    return await this._dbRepo.create(item).then((item) => plainToInstance(this._entity, item));
  }

  async update(id: any, item: U): Promise<void> {
    await this._dbRepo.update(item, { where: { id } });
  }

  async destroy(id: any): Promise<void> {
    await this._dbRepo.destroy({ where: { id } });
  }
}
