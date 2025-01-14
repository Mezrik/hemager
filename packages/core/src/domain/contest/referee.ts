import { Entity, EntityProperties } from '@/common/entity';

export class Referee extends Entity {
  constructor(
    private _name: string,
    private _contestId: string,
    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);
  }

  get name() {
    return this._name;
  }

  get contestId() {
    return this._contestId;
  }
}
