import { EntitySchema } from "typeorm";

class RaceEntry {
  static schema = new EntitySchema({
    columns: {
      comment: {
        allowNull: false,
        type: "varchar",
      },
      first: {
        allowNull: false,
        type: "integer",
      },
      firstRate: {
        allowNull: false,
        type: "float",
      },
      id: {
        generated: "uuid",
        primary: true,
        type: "uuid",
      },
      number: {
        nullable: false,
        type: "int",
      },
      others: {
        allowNull: false,
        type: "integer",
      },
      paperWin: {
        allowNull: false,
        type: "integer",
      },
      predictionMark: {
        allowNull: false,
        type: "varchar",
      },
      rockWin: {
        allowNull: false,
        type: "integer",
      },
      scissorsWin: {
        allowNull: false,
        type: "integer",
      },
      second: {
        allowNull: false,
        type: "integer",
      },
      third: {
        allowNull: false,
        type: "integer",
      },
      thirdRate: {
        allowNull: false,
        type: "float",
      },
    },
    name: "RaceEntry",
    orderBy: {
      number: "ASC",
    },
    relations: {
      player: {
        target: "Player",
        type: "many-to-one",
      },
      race: {
        inverseSide: "entries",
        target: "Race",
        type: "many-to-one",
      },
    },
    target: RaceEntry,
  });

  /** @param {Partial<RaceEntry>} [payload] */
  constructor(payload = {}) {
    /** @type {string} */
    this.id = payload.id;
    /** @type {number} */
    this.number = payload.number;
    /** @type {import('./Player').Player} */
    this.player = payload.player;
    /** @type {import('./Race').Race} */
    this.race = payload.race;
    /** @type {string} */
    this.predictionMark = payload.predictionMark;
    /** @type {number} */
    this.first = payload.first;
    /** @type {number} */
    this.second = payload.second;
    /** @type {number} */
    this.third = payload.third;
    /** @type {number} */
    this.others = payload.others;
    /** @type {number} */
    this.rockWin = payload.rockWin;
    /** @type {number} */
    this.scissorsWin = payload.scissorsWin;
    /** @type {number} */
    this.paperWin = payload.paperWin;
    /** @type {number} */
    this.firstRate = payload.firstRate;
    /** @type {number} */
    this.thirdRate = payload.thirdRate;
    /** @type {string} */
    this.comment = payload.comment;
  }
}

export { RaceEntry };
