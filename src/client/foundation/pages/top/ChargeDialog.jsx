import { motion } from "framer-motion";
import React, { forwardRef, useCallback, useEffect, useState } from "react";

import { Dialog } from "foundation/components/layouts/Dialog";
import { Spacer } from "foundation/components/layouts/Spacer";
import { Stack } from "foundation/components/layouts/Stack";
import { Heading } from "foundation/components/typographies/Heading";
import { useMutation } from "foundation/hooks/useMutation";
import { Space } from "foundation/styles/variables";
import { jsonFetcher } from "foundation/utils/HttpUtils";

const CANCEL = "cancel";
const CHARGE = "charge";

/**
 * @typedef Props
 * @type {object}
 */

/** @type {React.ForwardRefExoticComponent<{Props>} */
const ChargeDialog = forwardRef(({ onComplete }, ref) => {
  const [bankCode, setBankCode] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [amount, setAmount] = useState(0);

  const [zenginCode, setZenginCode] = useState({});

  useEffect(() => {
    const fetchZenginCode = async () => {
      await jsonFetcher("/api/zengin-code").then((response) => {
        setZenginCode(response);
      });
    };
    fetchZenginCode();
  }, []);

  const clearForm = useCallback(() => {
    setBankCode("");
    setBranchCode("");
    setAccountNo("");
    setAmount(0);
  }, []);

  const [charge] = useMutation("/api/users/me/charge", {
    auth: true,
    method: "POST",
  });

  const handleCodeChange = useCallback((e) => {
    setBankCode(e.currentTarget.value);
    setBranchCode("");
  }, []);

  const handleBranchChange = useCallback((e) => {
    setBranchCode(e.currentTarget.value);
  }, []);

  const handleAccountNoChange = useCallback((e) => {
    setAccountNo(e.currentTarget.value);
  }, []);

  const handleAmountChange = useCallback((e) => {
    setAmount(parseInt(e.currentTarget.value, 10));
  }, []);

  const handleCloseDialog = useCallback(
    async (e) => {
      if (e.currentTarget.returnValue === CANCEL) {
        clearForm();
        return;
      }

      await charge({ accountNo, amount, bankCode, branchCode });
      clearForm();
      onComplete();
    },
    [charge, bankCode, branchCode, accountNo, amount, onComplete, clearForm],
  );

  const bankList = Object.entries(zenginCode).map(([code, { name }]) => ({
    code,
    name,
  }));
  const bank = zenginCode[bankCode];
  const branch = bank?.branches[branchCode];

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
                value={bankCode}
              />
            </label>

            <datalist id="ChargeDialog-bank-list">
              {bankList.map(({ code, name }) => <option key={code} value={code}>{`${name} (${code})`}</option>)}
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
                value={branchCode}
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
                value={accountNo}
              />
            </label>

            <label>
              金額
              <input
                min={0}
                onChange={handleAmountChange}
                type="number"
                value={amount}
              />
              Yen
            </label>

            <div>※実在する通貨がチャージされることはありません</div>

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
export default ChargeDialog;

ChargeDialog.displayName = "ChargeDialog";
