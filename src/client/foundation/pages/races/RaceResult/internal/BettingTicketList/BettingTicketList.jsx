import React from "react";
import styled from "styled-components";

import { EntryCombination } from "../../../../../components/displays/EntryCombination";

const ItemWrapper = styled.tr`
  padding: ${8}px ${16}px;

  &:not(:last-child) {
    border-bottom: 1px solid #a8a29e;
  }
`;

const Cell = styled.td`
  padding: ${8}px;
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
    border-bottom: 2px solid #1c1917;
  }
`;

const Placeholder = styled.div`
  align-items: center;
  color: #a8a29e;
  display: flex;
  font-size: 1.25rem;
  font-weight: bold;
  gap: ${16}px;
  justify-content: center;
  padding: ${16}px;
`;

export const BettingTicketList = ({ children }) => {
  if (React.Children.count(children) === 0) {
    return (
      <Placeholder>
        <i className="fas fa-ticket-alt" />
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
