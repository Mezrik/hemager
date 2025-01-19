import { DeploymentCriteria } from '@hemager/api-types';

import { EntityProperties, NoIdEntity } from '@/common/entity';

import { Contestant } from '../contestant/contestant';

export class RoundParticipant extends NoIdEntity {
  constructor(
    private _roundId: string,
    private _contestant: Contestant,
    _entityProperties?: Omit<EntityProperties, 'id'>,
  ) {
    super(_entityProperties);
  }

  get contestant() {
    return this._contestant;
  }

  get roundId() {
    return this._roundId;
  }

  public retrieveDeplymentCriterion(criterion: DeploymentCriteria) {
    switch (criterion) {
      case DeploymentCriteria.rating:
        return this._contestant.rating;
      case DeploymentCriteria.club:
        return this._contestant.club?.id;
      case DeploymentCriteria.nationality:
        return this._contestant.nationality;
      default:
        return undefined;
    }
  }
}
