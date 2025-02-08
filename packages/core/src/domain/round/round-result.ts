import { Expose } from 'class-transformer';

export class RoundResult {
  constructor(
    private _roundId: string,
    private _contestantId: string,
    private _winCount: number,
  ) {}

  @Expose()
  get roundId() {
    return this._roundId;
  }

  @Expose()
  get contestantId() {
    return this._contestantId;
  }

  @Expose()
  get winCount() {
    return this._winCount;
  }
}
