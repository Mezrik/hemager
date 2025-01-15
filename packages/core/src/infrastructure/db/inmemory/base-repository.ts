import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Attributes, Transaction } from 'sequelize';
import { Model, Sequelize, Repository as DbRepository } from 'sequelize-typescript';

import { Entity } from '@/common/entity';
import { Repository } from '@/common/interfaces';

export class BaseRepository<T extends Model, U extends Entity> implements Repository<U> {
  private _dbRepo: DbRepository<T>;
  private _entity: new (...args: any) => U;

  constructor(db: Sequelize, model: new (...args: any) => T, entity: new (...args: any) => U) {
    this._dbRepo = db.getRepository(model);
    this._entity = entity;
  }

  async findOne(id: string): Promise<U> {
    return plainToInstance(this._entity, await this._dbRepo.findByPk(id));
  }

  async findAll(): Promise<U[]> {
    return await this._dbRepo
      .findAll()
      .then((items) => items.map((item) => plainToInstance(this._entity, item)));
  }

  async create(item: U, transaction?: Transaction): Promise<U> {
    const attributes = instanceToPlain(item) as Attributes<T>;

    return await this._dbRepo
      .create(attributes, { transaction })
      .then((item) => plainToInstance(this._entity, item));
  }

  async update(id: string, item: U, transaction?: Transaction): Promise<void> {
    // @ts-expect-error Property 'id' does not exist on type 'U'.
    await this._dbRepo.update(item, { where: { id }, transaction });
  }

  async destroy(id: string, transaction?: Transaction): Promise<void> {
    // @ts-expect-error Property 'id' does not exist on type 'U'.
    await this._dbRepo.destroy({ where: { id }, transaction });
  }
}
