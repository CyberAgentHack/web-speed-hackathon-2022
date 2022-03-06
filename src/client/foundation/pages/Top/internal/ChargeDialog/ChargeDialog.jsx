import React, { forwardRef, useCallback, useEffect, useState } from "react";

import { Dialog } from "../../../../components/layouts/Dialog";
import { Spacer } from "../../../../components/layouts/Spacer";
import { Stack } from "../../../../components/layouts/Stack";
import { Heading } from "../../../../components/typographies/Heading";
import { useMutation } from "../../../../hooks/useMutation";
import { useFetch } from "../../../../hooks/useFetch";
import { Space } from "../../../../styles/variables";
import { jsonFetcher } from "../../../../utils/HttpUtils";
import { Container } from "../../../../components/layouts/Container";
import styled, { keyframes } from "styled-components";

const CANCEL = "cancel";
const CHARGE = "charge";

/**
 * @typedef Props
 * @type {object}
 */

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
const FadeIn = styled.div`
  animation: ${fadeIn} .5s ease-in-out;
`;
/** @type {React.ForwardRefExoticComponent<{Props>} */
export const ChargeDialog = forwardRef(({ onComplete }, ref) => {
  const [bankCode, setBankCode] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [amount, setAmount] = useState(0);
  const data = useFetch(`/assets/zengin-data.json`, jsonFetcher)
  const [zenginCode, setzenginCode] = useState({});
  const [bankList, setBankList] = useState([]);
  const [bank, setBank] = useState(null);
  const [branch, setBranch] = useState([]);
  useEffect(() => {
    if (!data.loading) {
      const code = JSON.parse(JSON.stringify(data.data));
      setzenginCode(data.data);
      const list = Object.entries(code).map(([code, { name }]) => ({
        code,
        name,
      }))
      setBankList(list)
    }
  }, [data.loading]);

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

  useEffect(() => {
    setBank(zenginCode[bankCode])
  }, [bankCode])

  useEffect(() => {
    setBranch(bank?.branches[branchCode])
  }, [branchCode])

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


  return (
    <Dialog ref={ref} onClose={handleCloseDialog}>
      <section>
        <Heading as="h1">チャージ</Heading>

        <Spacer mt={Space * 2} />
        <form method="dialog">
          {bankList.length === 0 ? <Container>Loading...</Container> : <Stack gap={Space * 1}>
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

            {branch && (
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
          </Stack>}
        </form>
      </section>
    </Dialog>
  );
});

ChargeDialog.displayName = "ChargeDialog";
