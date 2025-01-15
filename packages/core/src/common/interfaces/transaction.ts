export interface Transaction {
  commit(): Promise<void>;

  rollback(): Promise<void>;

  afterCommit(fn: (transaction: this) => void | Promise<void>): void;
}
