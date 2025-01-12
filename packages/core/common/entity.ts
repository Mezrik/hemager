import { nanoid } from 'nanoid';

type EntityProperties = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
};

class Entity {
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

export { Entity, EntityProperties };
