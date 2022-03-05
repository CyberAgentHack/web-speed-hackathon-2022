import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { BreakPoint, Color, Radius, Space } from "../../../styles/variables";
import { Stack } from "../../layouts/Stack";

/**
 * @typedef ItemProps
 * @property {string} to
 */

const ItemWrapper = styled.li`
  a {
    border: 1px solid ${Color.mono[400]};
    border-radius: ${Radius.MEDIUM};
    display: block;
    font-weight: bold;
    padding-bottom: ${Space * 1}px;
    padding-top: ${Space * 1}px;
    text-align: center;
    width: 96px;

    &:hover {
      border-color: ${Color.mono[600]};
    }

    &[aria-current] {
      background: ${Color.mono[900]};
      color: ${Color.mono[0]};
    }

    @media (min-width: ${BreakPoint.TABLET}px) {
      width: 160px;
    }
  }
`;

/** @type {React.FC<ItemProps & React.AnchorHTMLAttributes>} */
const Item = ({ "aria-current": ariaCurrent, children, to, ...rest }) => {
  return (
    <ItemWrapper>
      {ariaCurrent ? (
        <a aria-current {...rest}>
          {children}
        </a>
      ) : (
        <Link aria-current={ariaCurrent} to={to} {...rest}>
          {children}
        </Link>
      )}
    </ItemWrapper>
  );
};

export const TabNav = ({ children }) => {
  return (
    <nav>
      <Stack horizontal as="ul" gap={Space * 2}>
        {children}
      </Stack>
    </nav>
  );
};
TabNav.Item = Item;
