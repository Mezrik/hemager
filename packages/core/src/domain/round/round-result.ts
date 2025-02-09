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

  set roundId(roundId: string) {
    this._roundId = roundId;
  }

  @Expose()
  get contestantId() {
    return this._contestantId;
  }

  set contestantId(contestantId: string) {
    this._contestantId = contestantId;
  }

  @Expose()
  get winCount() {
    return this._winCount;
  }

  set winCount(winCount: number) {
    this._winCount = winCount;
  }
}
