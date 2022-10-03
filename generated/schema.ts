// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class HyperimageDeployed extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save HyperimageDeployed entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type HyperimageDeployed must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("HyperimageDeployed", id.toString(), this);
    }
  }

  static load(id: string): HyperimageDeployed | null {
    return changetype<HyperimageDeployed | null>(
      store.get("HyperimageDeployed", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get token(): Bytes {
    let value = this.get("token");
    return value!.toBytes();
  }

  set token(value: Bytes) {
    this.set("token", Value.fromBytes(value));
  }

  get image(): Bytes {
    let value = this.get("image");
    return value!.toBytes();
  }

  set image(value: Bytes) {
    this.set("image", Value.fromBytes(value));
  }
}

export class Initialized extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Initialized entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Initialized must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Initialized", id.toString(), this);
    }
  }

  static load(id: string): Initialized | null {
    return changetype<Initialized | null>(store.get("Initialized", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get version(): BigInt {
    let value = this.get("version");
    return value!.toBigInt();
  }

  set version(value: BigInt) {
    this.set("version", Value.fromBigInt(value));
  }
}