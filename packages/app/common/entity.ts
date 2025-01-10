import { v4 as uuidv4 } from "uuid";

class Entity {
  private _id: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string = uuidv4(),
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this._id = id;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  public get id() {
    return this._id;
  }
}

export { Entity };
