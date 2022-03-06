import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  align-items: ${({ $alignItems }) => $alignItems};
  display: flex;
  flex-direction: ${({ $horizontal }) => ($horizontal ? "row" : "column")};
  flex-wrap: ${({ $wrap }) => $wrap};
  gap: ${({ $gap }) => ($gap ? `${$gap}px` : undefined)};
  justify-content: ${({ $justifyContent }) => $justifyContent};
`;

/**
 * @typedef Props
 * @property {(string | React.ComponentType<any>)=} as
 * @property {boolean=} horizontal
 * @property {number} gap
 * @property {import('csstype').Property.AlignItems=} alignItems
 * @property {import('csstype').Property.JustifyContent=} justifyContent
 * @property {import('csstype').Property.FlexWrap=} wrap
 */

export const Stack = (
  /** @type {React.PropsWithChildren<Props>} */
  { alignItems, as, children, gap, horizontal, justifyContent, wrap },
) => {
  return (
    <Wrapper
      $alignItems={alignItems}
      $gap={gap}
      $horizontal={horizontal}
      $justifyContent={justifyContent}
      $wrap={wrap}
      as={as}
    >
      {children}
    </Wrapper>
  );
};

const ItemWrapper = styled.div`
  flex-basis: ${({ $basis }) => $basis};
  flex-grow: ${({ $grow }) => $grow};
  flex-shrink: ${({ $shrink }) => $shrink};
`;

/**
 * @typedef ItemProps
 * @property {(string | React.ComponentType<any>)=} as
 * @property {(number | string)=} basis
 * @property {(number | string)=} grow
 * @property {(number | string)=} shrink
 */

/** @type {React.FC<ItemProps>} */
const Item = ({ as, basis, children, grow, shrink }) => {
  return (
    <ItemWrapper $basis={basis} $grow={grow} $shrink={shrink} as={as}>
      {children}
    </ItemWrapper>
  );
};
Stack.Item = Item;
