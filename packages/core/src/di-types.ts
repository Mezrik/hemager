export const TYPES = {
  Db: Symbol('Db'),
  TransactionManager: Symbol('TransactionManager'),
  CommandBus: Symbol('CommandBus'),
  QueryBus: Symbol('QueryBus'),
  Logger: Symbol('Logger'),

  CommandHandler: Symbol('CommandHandler'),
  QueryHandler: Symbol('QueryHandler'),

  ContestRepository: Symbol('ContestRepository'),
  RoundRepository: Symbol('RoundRepository'),
  ContestantRepository: Symbol('ContestantRepository'),
};
