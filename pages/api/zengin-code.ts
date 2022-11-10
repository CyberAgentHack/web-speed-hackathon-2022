import { NextApiRequest, NextApiResponse } from "next";

import zenginCode, { Bank, Branch } from "zengin-code";

type ZenginBranch = Pick<Branch, "code" | "name">;
type ZenginBranchRecord = Record<string, ZenginBranch>;
type ZenginBank = Pick<Bank, "code" | "name"> & { branches: ZenginBranchRecord };
type ZenginBankRecord = Record<string, ZenginBank>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ZenginBankRecord>,
) {
  const bankRecord: ZenginBankRecord = {};
  Object.entries(zenginCode).forEach(([code, { branches, name }]) => {
    const branchRecord: ZenginBranchRecord = {};
    Object.entries(branches).forEach(([code, { name }]) => {
      branchRecord[code] = { code, name };
    });

    bankRecord[code] = {
      branches: branchRecord,
      code,
      name,
    };
  });

  res.send(bankRecord);
}
