import { EntityProperties, NoIdEntity } from '@/common/entity';

export class RoundParticipant extends NoIdEntity {
  constructor(
    private _roundId: string,
    private _contestantId: string,
    _entityProperties?: Omit<EntityProperties, 'id'>,
  ) {
    super(_entityProperties);
  }

  get contestantId() {
    return this._contestantId;
  }

  get roundId() {
    return this._roundId;
  }
}
