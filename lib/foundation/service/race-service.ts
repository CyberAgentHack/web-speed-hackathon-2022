import dayjs from "dayjs";
import { createConnection } from "@/typeorm/connection";
import { Between, FindManyOptions, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { Race } from "@/model";
import { Service } from "./service";

class RaceService extends Service {
  async findAll(sinceUnix: number, untilUnix: number): Promise<Race[]> {
    const since = dayjs.unix(sinceUnix);
    const until = dayjs.unix(untilUnix);

    if (since != null && !since.isValid()) {
      // TODO エラーにしなくてよいのか??
      console.error("Invalid since = " + since);
      return [];
    }
    if (until != null && !until.isValid()) {
      // TODO エラーにしなくてよいのか??
      console.error("Invalid until = " + until);
      return [];
    }

    const repo = (await createConnection()).getRepository(Race);

    const where = {};
    if (since != null && until != null) {
      Object.assign(where, {
        startAt: Between(
          since.utc().format("YYYY-MM-DD HH:mm:ss"),
          until.utc().format("YYYY-MM-DD HH:mm:ss"),
        ),
      });
    } else if (since != null) {
      Object.assign(where, {
        startAt: MoreThanOrEqual(since.utc().format("YYYY-MM-DD HH:mm:ss")),
      });
    } else if (until != null) {
      Object.assign(where, {
        startAt: LessThanOrEqual(until.utc().format("YYYY-MM-DD HH:mm:ss")),
      });
    }

    const condition: FindManyOptions = {
      where,
      order: {
        startAt: 1,
      },
    };
    return repo.find(condition);
  }
}

export const raceService = new RaceService();
