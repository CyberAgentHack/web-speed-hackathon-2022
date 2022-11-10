import { EntitySchema } from "typeorm";

class Player {
  static schema = new EntitySchema({
    columns: {
      id: {
        generated: "uuid",
        primary: true,
        type: "uuid",
      },
      image: {
        nullable: false,
        type: "text",
      },
      name: {
        nullable: false,
        type: "varchar",
      },
      shortName: {
        nullable: false,
        type: "varchar",
      },
    },
    name: "Player",
    target: Player,
  });

  /** @param {Partial<Player>} [payload] */
  constructor(payload = {}) {
    /** @type {string} */
    this.id = payload.id;
    /** @type {string} */
    this.name = payload.name;
    /** @type {string} */
    this.shortName = payload.shortName;
    /** @type {string} */
    this.image = payload.image;
  }
}

export { Player };
