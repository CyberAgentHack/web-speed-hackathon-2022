import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { LinkButton } from "../../../../components/buttons/LinkButton";
import { Spacer } from "../../../../components/layouts/Spacer";
import { Stack } from "../../../../components/layouts/Stack";
import { TrimmedImage } from "../../../../components/media/TrimmedImage";
import {  Color, FontSize, Radius,Space } from "../../../../styles/variables";
import { formatCloseAt } from "../../../../utils/DateUtils";

export const RecentRaceList = ({ children }) => {
  return (
    <Stack as="ul" gap={Space * 2}>
      {children}
    </Stack>
  );
};
const ItemWrapper = styled.li`
  background: ${Color.mono[0]};
  border-radius: ${Radius.MEDIUM};
  opacity: ${({ $opacity }) => $opacity};
  padding: ${Space * 3}px;
`;

const RaceButton = styled(LinkButton)`
  background: ${Color.mono[700]};
  border-radius: ${Radius.MEDIUM};
  color: ${Color.mono[0]};
  padding: ${Space * 1}px ${Space * 2}px;

  &:hover {
    background: ${Color.mono[800]};
  }
`;

const RaceTitle = styled.h2`
  font-size: ${FontSize.LARGE};
  font-weight: bold;
`;

/**
 * @typedef ItemProps
 * @property {Model.Race} race
 */

/** @type {React.VFC<ItemProps>} */
const Item = ({ race }) => {
  const [closeAtText, setCloseAtText] = useState(formatCloseAt(race.closeAt));
  const [opacity, setOpacity]  = useState(0)

  useEffect(()=>{
    const a = setTimeout(()=>{
      setOpacity(1)
    },1)
    return ()=>{clearTimeout(a)}
  },[])
  // 締切はリアルタイムで表示したい
  useEffect(() => {
    const timer = setInterval(() => {
      setCloseAtText(formatCloseAt(race.closeAt));
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [race.closeAt]);

  return (
    <ItemWrapper className="item-wrapper transition"  style={{opacity: opacity, padding: `${Space * 3}px` }}>
      <Stack horizontal alignItems="center" justifyContent="space-between">
        <Stack gap={Space * 1}>
          <RaceTitle className="race-title">{race.name}</RaceTitle>
          <p>{closeAtText}</p>
        </Stack>

        <Spacer mr={Space * 2} />

        <Stack.Item grow={0} shrink={0}>
          <Stack horizontal alignItems="center" gap={Space * 2}>
            <TrimmedImage height={100} src={race.image.substring(0,race.image.length-3)+'webp'} width={100} />
            <RaceButton className="race-button" style={{padding: `${Space * 1}px ${Space * 2}px`}} to={`/races/${race.id}/race-card`}>投票</RaceButton>
          </Stack>
        </Stack.Item>
      </Stack>
    </ItemWrapper>
  );
};
RecentRaceList.Item = Item;
