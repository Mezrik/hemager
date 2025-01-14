import { nanoid } from 'nanoid';
import { Entity as EntityInterface, EntityProperties } from './interfaces/entity.js';

class Entity implements EntityInterface {
  constructor(
    private _entityProperties: EntityProperties = {
      id: nanoid(),
      createdAt: new Date(),
    },
  ) {}

  public get id() {
    return this._entityProperties.id;
  }

  public get createdAt() {
    return this._entityProperties.createdAt;
  }

  public get updatedAt() {
    return this._entityProperties.updatedAt;
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
