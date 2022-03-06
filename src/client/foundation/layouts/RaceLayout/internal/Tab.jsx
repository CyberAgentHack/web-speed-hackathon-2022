import React from "react";
import { useLocation } from "react-router-dom";

import { TabNav } from "../../../components/navs/TabNav";

/** @type {React.FC<{ raceId: string; selected: string }>} */
export const Tab = ({ raceId }) => {
  const location = useLocation();
  const pathList = location.pathname.split("/");
  const selected = pathList[pathList.length - 1];

  return (
    <TabNav>
      <TabNav.Item
        aria-current={selected === "race-card"}
        to={`/races/${raceId}/race-card`}
      >
        出走表
      </TabNav.Item>
      <TabNav.Item
        aria-current={selected === "odds"}
        to={`/races/${raceId}/odds`}
      >
        オッズ
      </TabNav.Item>
      <TabNav.Item
        aria-current={selected === "result"}
        to={`/races/${raceId}/result`}
      >
        結果
      </TabNav.Item>
    </TabNav>
  );
};
