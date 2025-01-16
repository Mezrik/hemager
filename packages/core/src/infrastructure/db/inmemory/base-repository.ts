import { plainToInstance } from 'class-transformer';
import { Attributes, Transaction } from 'sequelize';
import { Model, Sequelize, Repository as DbRepository } from 'sequelize-typescript';

import { Entity } from '@/common/entity';
import { Repository } from '@/common/interfaces';
import { instanceToPlain } from '@/common/utils/transformer';

export class BaseRepository<T extends Model, U extends Entity> implements Repository<U> {
  private _dbRepo: DbRepository<T>;
  private _entity: new (...args: any) => U;
  private _modelToEntity: (model: T) => U;
  private _entityToAttributes: (entity: U) => Attributes<T>;

  constructor(
    db: Sequelize,
    model: new (...args: any) => T,
    entity: new (...args: any) => U,
    modelToEntity?: (model: T) => U,
    entityToAttributes?: (entity: U) => Attributes<T>,
  ) {
    this._dbRepo = db.getRepository(model);
    this._entity = entity;

    this._modelToEntity = modelToEntity || ((m) => plainToInstance(this._entity, m));
    this._entityToAttributes = entityToAttributes || ((entity) => instanceToPlain(entity));
  }

  async findOne(id: string): Promise<U | null> {
    const item = await this._dbRepo.findByPk(id);

    if (!item) {
      return null;
    }

    return this._modelToEntity(item);
  }

  async findAll(): Promise<U[]> {
    return await this._dbRepo
      .findAll()
      .then((items) => items.map((item) => this._modelToEntity(item)));
  }

  async create(item: U, transaction?: Transaction): Promise<U> {
    const attributes = instanceToPlain(this._entityToAttributes(item)) as Attributes<T>;

    console.log(attributes);

    return await this._dbRepo
      .create(attributes, { transaction })
      .then((item) => this._modelToEntity(item));
  }

  async update(id: string, item: U, transaction?: Transaction): Promise<void> {
    const payload = this._entityToAttributes(item);
    // @ts-expect-error Property 'id' does not exist on type 'U'.
    await this._dbRepo.update(payload, { where: { id }, transaction });
  }

  async destroy(id: string, transaction?: Transaction): Promise<void> {
    // @ts-expect-error Property 'id' does not exist on type 'U'.
    await this._dbRepo.destroy({ where: { id }, transaction });
  }
}
