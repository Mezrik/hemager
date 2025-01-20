import { Entity, EntityProperties } from '@/common/entity';
import { Expose } from 'class-transformer';

export class ContestCategory extends Entity {
  constructor(
    private _name: string,
    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);
  }

  @Expose()
  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }
}
