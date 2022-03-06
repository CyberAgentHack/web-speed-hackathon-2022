import { EntitySchema } from "typeorm";

class User {
  static schema = new EntitySchema({
    columns: {
      balance: {
        default: 0,
        nullable: false,
        type: "int",
      },
      id: {
        generated: "uuid",
        primary: true,
        type: "uuid",
      },
      payoff: {
        default: 0,
        nullable: false,
        type: "int",
      },
    },
    name: "User",
    target: User,
  });

  /** @param {Partial<User>} [payload] */
  constructor(payload = {}) {
    /** @type {string} */
    this.id = payload.id;
    /** @type {number} */
    this.balance = payload.balance;
    /** @type {number} */
    this.payoff = payload.payoff;
  }
}

export { User };
