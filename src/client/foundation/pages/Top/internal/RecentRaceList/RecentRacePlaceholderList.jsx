import React from "react";
import styled from "styled-components";

import { Stack } from "../../../../components/layouts/Stack";
import { Color, Radius, Space } from "../../../../styles/variables";

export const RecentRacePlaceholderList = ({ children }) => {
  return (
    <Stack as="ul" gap={Space * 2}>
      {children}
    </Stack>
  );
};

const Placeholder = styled.li`
  background: ${Color.mono[1]};
  border-radius: ${Radius.MEDIUM};
  padding: ${Space * 3}px;
  height: 148px;
`;

/** @type {React.VFC<ItemProps>} */
const Item = () => {
  const ITEM_LENGTH = 20;
  return (
    <>
      {[...Array(ITEM_LENGTH).keys()].map((key) => (
        <Placeholder key={key} />
      ))}
    </>
  );
};
RecentRacePlaceholderList.Item = Item;
