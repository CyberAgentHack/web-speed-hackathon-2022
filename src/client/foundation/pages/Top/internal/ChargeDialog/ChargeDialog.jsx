// import { motion } from "framer-motion";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { Dialog } from "../../../../components/layouts/Dialog";
import { Spacer } from "../../../../components/layouts/Spacer";
import { Stack } from "../../../../components/layouts/Stack";
import { Heading } from "../../../../components/typographies/Heading";
import { useFetch } from "../../../../hooks/useFetch";
import { useMutation } from "../../../../hooks/useMutation";
import { Space } from "../../../../styles/variables";
import { jsonFetcher } from "../../../../utils/HttpUtils";

const CANCEL = "cancel";
const CHARGE = "charge";

const Div = styled.div`
  opacity: ${({ $opacity }) => $opacity};
  transition: opacity 0.3s;
`;

const AnimatedDiv = ({ children, visible }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(visible);
    }, 0);
  }, [visible]);

  if (visible) {
    return <Div $opacity={show ? 1 : 0}>{children}</Div>;
  } else {
    return null;
  }
};

/**
 * @typedef Props
 * @type {object}
 */

/** @type {React.ForwardRefExoticComponent<{Props>} */
export const ChargeDialog = forwardRef(({ onComplete }, ref) => {
  const [bankCode, setBankCode] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [amount, setAmount] = useState(0);
  const [bank, setBank] = useState(null);

  const { data: bankList } = useFetch("/api/bank/list", jsonFetcher);

  const clearForm = useCallback(() => {
    setBankCode("");
    setBranchCode("");
    setAccountNo("");
    setAmount(0);
    setBank(null);
  }, []);

  const [charge] = useMutation("/api/users/me/charge", {
    auth: true,
    method: "POST",
  });

  const handleCodeChange = useCallback(async (e) => {
    const bankCode = e.currentTarget.value;
    setBankCode(bankCode);
    setBranchCode("");

    const bank = await jsonFetcher(`/api/bank/${bankCode}`);
    setBank(bank.bank);
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

  // const bank = zenginCode[bankCode];
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
              {bankList?.bankList?.map(({ code, name }) => (
                <option key={code} value={code}>{`${name} (${code})`}</option>
              ))}
            </datalist>

            {/* {bank != null && (
              <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                銀行名: {bank.name}銀行
              </motion.div>
            )} */}

            <AnimatedDiv visible={bank != null}>
              銀行名: {bank?.name}銀行
            </AnimatedDiv>

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

            {/* {branch && (
              <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                支店名: {branch.name}
              </motion.div>
            )} */}
            <AnimatedDiv visible={branch != null}>
              支店名: {branch?.name}
            </AnimatedDiv>

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
