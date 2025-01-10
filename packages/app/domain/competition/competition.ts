import { Entity } from "@/common/entity";

class Competition extends Entity {
  private _name: string;

  constructor(name: string) {
    super();
    this._name = name;
  }
}
