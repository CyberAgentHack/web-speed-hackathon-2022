import { EntitySchema } from "typeorm";

class BettingTicket {
  static schema = new EntitySchema({
    columns: {
      createdAt: {
        createDate: true,
        nullable: false,
        type: "datetime",
      },
      id: {
        generated: "uuid",
        primary: true,
        type: "uuid",
      },
      key: {
        nullable: false,
        type: "simple-json",
      },
      type: {
        nullable: false,
        type: "varchar",
      },
    },
    name: "BettingTicket",
    orderBy: {
      createdAt: "ASC",
    },
    relations: {
      race: {
        target: "Race",
        type: "many-to-one",
      },
      user: {
        target: "User",
        type: "many-to-one",
      },
    },
    target: BettingTicket,
  });

  /** @param {Partial<BettingTicket>} [payload] */
  constructor(payload = {}) {
    /** @type {string} */
    this.id = payload.id;
    /** @type {BettingType} */
    this.type = payload.type;
    /** @type {number[]} */
    this.key = payload.key;
    /** @type {string} */
    this.createdAt = payload.createdAt;
    /** @type {import('./User').User} */
    this.user = payload.user;
    /** @type {import('./Race').Race} */
    this.race = payload.race;
  }
}

export { BettingTicket };
