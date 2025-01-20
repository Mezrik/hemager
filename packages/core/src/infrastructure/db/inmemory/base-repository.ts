import { plainToInstance } from 'class-transformer';
import { Attributes, Includeable, Transaction } from 'sequelize';
import { Model, Sequelize, Repository as DbRepository } from 'sequelize-typescript';

import { Entity } from '@/common/entity';
import { Repository } from '@/common/interfaces';
import { instanceToPlain } from '@/common/utils/transformer';

export class BaseRepository<T extends Model, U extends Entity> implements Repository<U> {
  private _dbRepo: DbRepository<T>;
  private _entity: new (...args: any) => U;
  protected _modelToEntity: (model: T) => U;
  protected _entityToAttributes: (entity: U) => Attributes<T>;
  private _include?: Includeable | Includeable[];

  constructor(
    db: Sequelize,
    model: new (...args: any) => T,
    entity: new (...args: any) => U,
    modelToEntity?: (model: T) => U,
    entityToAttributes?: (entity: U) => Attributes<T>,
    include: Includeable | Includeable[] = { all: true },
  ) {
    this._dbRepo = db.getRepository(model);
    this._entity = entity;

    this._modelToEntity = modelToEntity || ((m) => plainToInstance(this._entity, m));
    this._entityToAttributes = entityToAttributes || ((entity) => instanceToPlain(entity));

    this._include = include;
  }

  async findOne(id: string): Promise<U | null> {
    const item = await this._dbRepo.findByPk(id, { include: this._include });

    if (!item) {
      return null;
    }

    return this._modelToEntity(item);
  }

  async findAll(): Promise<U[]> {
    return await this._dbRepo
      .findAll({ include: this._include })
      .then((items) => items.map((item) => this._modelToEntity(item)));
  }

  async create(item: U, transaction?: Transaction): Promise<U> {
    const attributes = instanceToPlain(this._entityToAttributes(item)) as Attributes<T>;

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
