import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { Section } from "../../../components/layouts/Section";
import { Spacer } from "../../../components/layouts/Spacer";
import { TabNav } from "../../../components/navs/TabNav";
import { OutletContext } from "../../../contexts/OutletContext";
import { Space } from "../../../styles/variables";

import { EntryTable } from "./internal/EntryTable";
import { PlayerPictureList } from "./internal/PlayerPictureList";

/** @type {React.VFC} */
export const RaceCard = () => {
  const { raceId } = useParams();
  const { entries } = useContext(OutletContext);

  return (
    <Section>
      <TabNav>
        <TabNav.Item aria-current to={`/races/${raceId}/race-card`}>
          出走表
        </TabNav.Item>
        <TabNav.Item to={`/races/${raceId}/odds`}>オッズ</TabNav.Item>
        <TabNav.Item to={`/races/${raceId}/result`}>結果</TabNav.Item>
      </TabNav>

      <Spacer mt={Space * 2} />
      <PlayerPictureList>
        {entries.map((entry) => (
          <PlayerPictureList.Item
            key={entry.id}
            image={entry.player.image}
            name={entry.player.name}
            number={entry.number}
          />
        ))}
      </PlayerPictureList>

      <Spacer mt={Space * 4} />
      <EntryTable entries={entries} />
    </Section>
  );
};
