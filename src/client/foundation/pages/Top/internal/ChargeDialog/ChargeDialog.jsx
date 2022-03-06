import React, { forwardRef, useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const FadeIn = styled.div`
  animation: ${fadeIn} 1s linear;
`;

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
  const [banks, setBanks] = useState([]);
  const [bank, setBank] = useState("");
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState("");

  const { data: bankData } = useFetch("/api/banks", jsonFetcher);

  const [charge] = useMutation("/api/users/me/charge", {
    auth: true,
  });

  const clearForm = useCallback(() => {
    setBankCode("");
    setBranchCode("");
    setAccountNo("");
    setAmount(0);
    setBank("");
    setBanks([]);
    setBranch("");
    setBranches([]);
  }, []);

  const handleCodeChange = useCallback(async (e) => {
    const bankCode = e.currentTarget.value;
    if (!bankCode) return;
    setBankCode(bankCode);
    setBranchCode("");
    const { branches } = await jsonFetcher(`/api/banks/${bankCode}`);
    setBranches(branches);
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

  useEffect(() => {
    if (!banks) return;
    setBank(banks[bankCode]);
  }, [bankCode, banks]);

  useEffect(() => {
    if (!branches) return;
    setBranch(branches[branchCode]);
  }, [branchCode, branches]);

  useEffect(() => {
    if (!bankData) return;
    const { banks } = bankData;
    setBanks(banks);
  }, [bankData, banks]);

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
              {banks?.length > 0 &&
                banks.map(({ code, name }) => (
                  <option key={code} value={code}>{`${name} (${code})`}</option>
                ))}
            </datalist>

            {bank != null && <FadeIn>銀行名: {bank.name}銀行</FadeIn>}

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
                branches &&
                Object.values(branches)?.map((branch) => (
                  <option key={branch.code} value={branch.code}>
                    {branch.name}
                  </option>
                ))}
            </datalist>

            {branch && <FadeIn>支店名: {branch.name}</FadeIn>}

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

export default ChargeDialog;
