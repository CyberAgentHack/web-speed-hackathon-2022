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

const Icon = styled.svg`
  overflow: visible;
  display: inline-block;
  font-size: inherit;
  height: 1em;
  vertical-align: -0.125em;
  width: 1.125em;
`;

export const BettingTicketList = ({ children }) => {
  if (React.Children.count(children) === 0) {
    return (
      <Placeholder>
        <Icon
          aria-hidden="true"
          focusable="false"
          role="img"
          viewBox="0 0 576 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M128 160h320v192H128V160zm400 96c0 26.51 21.49 48 48 48v96c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48v-96c26.51 0 48-21.49 48-48s-21.49-48-48-48v-96c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v96c-26.51 0-48 21.49-48 48zm-48-104c0-13.255-10.745-24-24-24H120c-13.255 0-24 10.745-24 24v208c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V152z"
            fill="currentColor"
          />
        </Icon>
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
