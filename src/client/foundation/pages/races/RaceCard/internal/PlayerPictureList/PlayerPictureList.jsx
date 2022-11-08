import React from "react";
import styled from "styled-components";

import { Stack } from "../../../../../components/layouts/Stack";
import { TrimmedImage } from "../../../../../components/media/TrimmedImage";
import { Color, FontSize, Space } from "../../../../../styles/variables";

const PlayerNumber = styled.span`
  border: 1px solid ${Color.mono[900]};
  font-weight: bold;
  height: 24px;
  text-align: center;
  width: 24px;
`;

const PlayerName = styled.span`
  font-size: ${FontSize.SMALL};
`;

/**
 * @typedef ItemProps
 * @property {Model.RaceEntry} entry
 */

/** @type {React.VFC<ItemProps>} */
const Item = ({ entry }) => {
  return (
    <Stack gap={Space * 1}>
      <TrimmedImage
        alt={`${entry?.player.name ?? ''}選手のプロフィール写真`}
        height={100}
        loading={"lazy"}
        src={entry?.player.image ?? ''}
        width={100}
      />

      <Stack horizontal alignItems="center" gap={Space / 2} wrap="wrap">
        <PlayerNumber>{entry?.number}</PlayerNumber>
        <PlayerName>{entry?.player.name}</PlayerName>
      </Stack>
    </Stack>
  );
};

export const PlayerPictureList = ({ children }) => {
  return (
    <Stack horizontal gap={Space * 2} wrap="wrap">
      {children}
    </Stack>
  );
};
PlayerPictureList.Item = Item;
