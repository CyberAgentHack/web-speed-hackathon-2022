import { motion } from "framer-motion";
import React, { forwardRef, useCallback, useState } from "react";
import zenginCode from "zengin-code";

import { Dialog } from "../../../components/layouts/Dialog";
import { Spacer } from "../../../components/layouts/Spacer";
import { Stack } from "../../../components/layouts/Stack";
import { Heading } from "../../../components/typographies/Heading.jsx";
import { useMutation } from "../../../hooks/useMutation";
import { Space } from "../../../styles/variables";

const CANCEL = "cancel";
const CHARGE = "charge";

/**
 * @typedef Props
 * @type {object}
 */

/** @type {React.ForwardRefExoticComponent<{Props>} */
export const ChargeDialog = forwardRef(({ onComplete }, ref) => {
  const [userChargeInfo, setUserChargeInfo] = useState({
    bankCode: "",
    branchCode: "",
    accountNo: "",
    amount: 0,
  });

  const clearForm = useCallback(() => {
    setUserChargeInfo({
      bankCode: "",
      branchCode: "",
      accountNo: "",
      amount: 0,
    });
  }, []);

  const [charge] = useMutation("/api/users/me/charge", {
    auth: true,
    method: "POST",
  });

  const handleCodeChange = (e) => {
    setUserChargeInfo({
      ...userChargeInfo,
      bankCode: e.currentTarget.value,
      branchCode: "",
    });
  };

  const handleBranchChange = (e) => {
    setUserChargeInfo({
      ...userChargeInfo,
      branchCode: e.currentTarget.value,
    });
  };

  const handleAccountNoChange = (e) => {
    setUserChargeInfo({
      ...userChargeInfo,
      accountNo: e.currentTarget.value,
    });
  };

  const handleAmountChange = (e) => {
    const value = parseInt(e.currentTarget.value, 10);
    setUserChargeInfo({
      ...userChargeInfo,
      amount: value,
    });
  };

  const handleCloseDialog = useCallback(
    async (e) => {
      if (e.currentTarget.returnValue === CANCEL) {
        clearForm();
        return;
      }

      const accountNo = userChargeInfo.accountNo;
      const amount = userChargeInfo.amount;
      const bankCode = userChargeInfo.bankCode;
      const branchCode = userChargeInfo.branchCode;
      await charge({ accountNo, amount, bankCode, branchCode });
      clearForm();
      onComplete();
    },
    [
      charge,
      userChargeInfo.bankCode,
      userChargeInfo.branchCode,
      userChargeInfo.accountNo,
      userChargeInfo.amount,
      onComplete,
      clearForm,
    ],
  );

  const bankList = Object.entries(zenginCode).map(([code, { name }]) => ({
    code,
    name,
  }));
  const bank = zenginCode[userChargeInfo.bankCode];
  const branch = bank?.branches[userChargeInfo.branchCode];

  return (
    <Dialog ref={ref} onClose={handleCloseDialog}>
      <section>
        <Heading as="h1">チャージ</Heading>

        <Spacer mt={Space * 2} />
        <form method="dialog">
          <Stack gap={Space * 1}>
            <label>
              銀行コード
              <input
                list="ChargeDialog-bank-list"
                onChange={handleCodeChange}
                value={userChargeInfo.bankCode}
              />
            </label>

            <datalist id="ChargeDialog-bank-list">
              {bankList.map(({ code, name }) => (
                <option key={code} value={code}>{`${name} (${code})`}</option>
              ))}
            </datalist>

            {bank != null && (
              <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                銀行名: {bank.name}銀行
              </motion.div>
            )}

            <label>
              支店コード
              <input
                list="ChargeDialog-branch-list"
                onChange={handleBranchChange}
                value={userChargeInfo.branchCode}
              />
            </label>

            <datalist id="ChargeDialog-branch-list">
              {bank != null &&
                Object.values(bank.branches).map((branch) => (
                  <option key={branch.code} value={branch.code}>
                    {branch.name}
                  </option>
                ))}
            </datalist>

            {branch && (
              <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                支店名: {branch.name}
              </motion.div>
            )}

            <label>
              口座番号
              <input
                onChange={handleAccountNoChange}
                type="text"
                value={userChargeInfo.accountNo}
              />
            </label>

            <label>
              金額
              <input
                min={0}
                onChange={handleAmountChange}
                type="number"
                value={userChargeInfo.amount}
              />
              円
            </label>

            <menu>
              <button value={CANCEL}>キャンセル</button>
              <button value={CHARGE}>チャージ</button>
            </menu>
          </Stack>
        </form>
      </section>
    </Dialog>
  );
});

ChargeDialog.displayName = "ChargeDialog";
