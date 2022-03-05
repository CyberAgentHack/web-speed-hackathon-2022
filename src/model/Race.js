import { EntitySchema } from "typeorm";

class Race {
  static schema = new EntitySchema({
    columns: {
      closeAt: {
        nullable: false,
        type: "datetime",
      },
      id: {
        generated: "uuid",
        primary: true,
        type: "uuid",
      },
      image: {
        nullable: false,
        type: "varchar",
      },
      name: {
        nullable: false,
        type: "varchar",
      },
      startAt: {
        nullable: false,
        type: "datetime",
      },
    },
    indices: [
      {
        columns: ["startAt"],
        unique: false,
      },
      {
        columns: ["closeAt"],
        unique: false,
      },
    ],
    name: "Race",
    orderBy: {
      startAt: "ASC",
    },
    relations: {
      entries: {
        inverseSide: "race",
        target: "RaceEntry",
        type: "one-to-many",
      },
      trifectaOdds: {
        inverseSide: "race",
        target: "OddsItem",
        type: "one-to-many",
      },
    },
    target: Race,
  });

  /** @param {Partial<Race>} [payload] */
  constructor(payload = {}) {
    /** @type {string} */
    this.id = payload.id;
    /** @type {string} */
    this.name = payload.name;
    /** @type {string} */
    this.image = payload.image;
    /** @type {string} */
    this.startAt = payload.startAt;
    /** @type {string} */
    this.closeAt = payload.closeAt;
    /** @type {import('./RaceEntry').RaceEntry[]} */
    this.entries = payload.entries;
    /** @type {import('./OddsItem').OddsItem[]} */
    this.trifectaOdds = payload.trifectaOdds;
  }
}

export { Race };
