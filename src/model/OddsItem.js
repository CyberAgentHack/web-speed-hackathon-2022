import { EntitySchema } from "typeorm";

class OddsItem {
  static schema = new EntitySchema({
    columns: {
      id: {
        generated: "uuid",
        primary: true,
        type: "uuid",
      },
      key: {
        nullable: false,
        type: "simple-json",
      },
      odds: {
        nullable: false,
        type: "int",
      },
      type: {
        nullable: false,
        type: "varchar",
      },
    },
    name: "OddsItem",
    relations: {
      race: {
        inverseSide: "trifectaOdds",
        target: "Race",
        type: "many-to-one",
      },
    },
    target: OddsItem,
  });

  /** @param {Partial<OddsItem>} [payload] */
  constructor(payload = {}) {
    /** @type {string} */
    this.id = payload.id;
    /** @type {BettingType} */
    this.type = payload.type;
    /** @type {number[]} */
    this.key = payload.key;
    /** @type {number} */
    this.odds = payload.odds;
    /** @type {import('./Race').Race} */
    this.race = payload.race;
  }
}

export { OddsItem };
