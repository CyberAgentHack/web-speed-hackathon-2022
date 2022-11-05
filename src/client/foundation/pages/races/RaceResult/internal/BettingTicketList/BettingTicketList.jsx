import React from "react";
import styled from "styled-components";

import { EntryCombination } from "../../../../../components/displays/EntryCombination";
import { Color, FontSize, Space } from "../../../../../styles/variables";

const ItemWrapper = styled.tr`
  padding: ${Space * 1}px ${Space * 2}px;

  &:not(:last-child) {
    border-bottom: 1px solid ${Color.mono[400]};
  }
`;

const Cell = styled.td`
  padding: ${Space * 1}px;
  text-align: ${({ $align }) => $align};
`;

/**
 * @typedef ItemProps
 * @property {Model.BettingTicket} ticket
 */

/** @type {React.VFC<ItemProps>} */
const Item = ({ ticket: { key } }) => {
  return (
    <ItemWrapper>
      <Cell>-</Cell>
      <Cell>
        <EntryCombination numbers={key} />
      </Cell>
      <Cell $align="right">100pt</Cell>
    </ItemWrapper>
  );
};

const Table = styled.table`
  border-spacing: 0;
`;

const Header = styled.tr`
  th {
    border-bottom: 2px solid ${Color.mono[900]};
  }
`;

const Placeholder = styled.div`
  align-items: center;
  color: ${Color.mono[400]};
  display: flex;
  font-size: ${FontSize.LARGE};
  font-weight: bold;
  gap: ${Space * 2}px;
  justify-content: center;
  padding: ${Space * 2}px;
`;

export const BettingTicketList = ({ children }) => {
  if (React.Children.count(children) === 0) {
    return (
      <Placeholder>
        <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 64v80c-26.5 0-48 21.5-48 48s21.5 48 48 48v80c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V304c26.5 0 48-21.5 48-48s-21.5-48-48-48V128z" />
        </svg>
        <div>購入した拳券はありません</div>
      </Placeholder>
    );
  }

  return (
    <Table>
      <thead>
      <Header>
        <Cell as="th">的中</Cell>
        <Cell as="th">買い目</Cell>
        <Cell $align="right" as="th" width="96px">
          数量
        </Cell>
      </Header>
      </thead>
      <tbody>{children}</tbody>
    </Table>
  );
};
BettingTicketList.Item = Item;
