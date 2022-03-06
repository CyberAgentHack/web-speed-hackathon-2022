import React from "react";
import styled from "styled-components";

import { CommonLayout } from "../../../layouts/CommonLayout";
import { BreakPoint, Space } from "../../../styles/variables";

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: ${Space * 2}px;
  padding-right: ${Space * 2}px;
  width: 100%;

  @media (min-width: ${BreakPoint.TABLET}px) {
    max-width: calc(1024px + ${Space * 5}px * 2);
    padding-left: ${Space * 5}px;
    padding-right: ${Space * 5}px;
  }
`;

/** @type {React.FC} */
export const Container = ({ children }) => {
  return (
    <CommonLayout>
      <Wrapper>{children}</Wrapper>
    </CommonLayout>
  );
};
