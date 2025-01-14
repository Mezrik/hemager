import { Entity, EntityProperties } from '@/common/entity';

export class ContestCategory extends Entity {
  constructor(
    private _name: string,
    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);
  }

  get name() {
    return this._name;
  }
}
