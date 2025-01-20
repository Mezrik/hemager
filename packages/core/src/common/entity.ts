import { Expose } from 'class-transformer';
import { nanoid } from 'nanoid';

import { Entity as EntityInterface, EntityProperties } from './interfaces/entity.js';

class Entity implements EntityInterface {
  constructor(
    private _entityProperties: EntityProperties = {
      id: nanoid(),
      createdAt: new Date(),
    },
  ) {
    this._entityProperties.updatedAt = new Date();
  }

  @Expose()
  public get id() {
    return this._entityProperties.id;
  }

  set id(id: string) {
    this._entityProperties.id = id;
  }

  public get createdAt() {
    return this._entityProperties.createdAt;
  }

  set createdAt(createdAt: Date | undefined) {
    this._entityProperties.createdAt = createdAt;
  }

  public get updatedAt() {
    return this._entityProperties.updatedAt;
  }

  set updatedAt(updatedAt: Date | undefined) {
    this._entityProperties.updatedAt = updatedAt;
  }
}

class NoIdEntity implements EntityInterface {
  constructor(
    private _entityProperties: Omit<EntityProperties, 'id'> = {
      createdAt: new Date(),
    },
  ) {}

  public get createdAt() {
    return this._entityProperties.createdAt;
  }

  public get updatedAt() {
    return this._entityProperties.updatedAt;
  }
}

export { Entity, NoIdEntity, type EntityProperties };
