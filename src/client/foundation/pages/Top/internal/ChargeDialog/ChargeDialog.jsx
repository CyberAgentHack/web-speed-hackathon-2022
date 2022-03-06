import React, { forwardRef, useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import { Dialog } from "../../../../components/layouts/Dialog";
import { Spacer } from "../../../../components/layouts/Spacer";
import { Stack } from "../../../../components/layouts/Stack";
import { Heading } from "../../../../components/typographies/Heading";
import { useMutation } from "../../../../hooks/useMutation";
import { Space } from "../../../../styles/variables";

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
export const ChargeDialog = forwardRef(({ onComplete }, ref) => {
  const [bankCode, setBankCode] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [amount, setAmount] = useState(0);
  const [zenginCode, setZenginCode] = useState({});
  const [bankList, setBankList] = useState([]);
  const [bank, setBank] = useState(null);
  const [branch, setBranch] = useState(null);

  useEffect(() => {
    const getZenginCode = async () => {
      const res = await fetch("/assets/data/banks.json");
      const data = await res.json();
      setZenginCode(data);
      setBankList([
        ...Object.entries(data).map(([code, { name }]) => ({
          code,
          name,
        })),
      ]);
    };
    getZenginCode();
  }, []);

  const clearForm = useCallback(() => {
    setBankCode("");
    setBranchCode("");
    setAccountNo("");
    setAmount(0);
  }, []);

  const [charge] = useMutation("/api/users/me/charge", {
    auth: true,
  });

  const handleCodeChange = useCallback((e) => {
    setBank(null);
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

  useEffect(() => {
    if (bankCode === "" || bankCode.length != 4) {
      return;
    }
    const getBranch = async () => {
      const res = await fetch("/assets/data/branches/" + bankCode + ".json");
      if (res.status !== 200) return;
      const data = await res.json();
      setBank({
        ...zenginCode[bankCode],
        branches: data,
      });
    };

    if (zenginCode[bankCode] !== undefined) {
      getBranch();
    }
  }, [bankCode, zenginCode]);

  useEffect(() => {
    if (bank === null) return;
    if (branchCode === "") return;
    if (bank.branches[branchCode]) {
      setBranch(bank.branches[branchCode]);
    } else {
      setBranch(null);
    }
  }, [bank, branchCode]);

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
              {bankList.map(({ code, name }) => (
                <option key={code} value={code}>{`${name} (${code})`}</option>
              ))}
            </datalist>

            {bank != null && (
              <FadeIn>
                銀行名: {bank.name}銀行
              </FadeIn>
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

            {branch != null && (
              <FadeIn>
                支店名: {branch.name}
              </FadeIn>
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
