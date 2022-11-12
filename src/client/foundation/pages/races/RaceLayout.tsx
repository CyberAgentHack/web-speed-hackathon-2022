import { Section } from "foundation/components/layouts/Section";
import { Spacer } from "foundation/components/layouts/Spacer";
import { TrimmedImage } from "foundation/components/media/TrimmedImage";
import { TabNav } from "foundation/components/navs/TabNav";
import { Heading } from "foundation/components/typographies/Heading";
import { Color, Radius, Space } from "foundation/styles/variables";
import { formatTime } from "foundation/utils/DateUtils";
import { NextPageWithLayout } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { Race } from "../../../../model";

const LiveBadge = styled.span`
  background: ${Color.red};
  border-radius: ${Radius.SMALL};
  color: ${Color.mono[0]};
  font-weight: bold;
  padding: ${Space * 1}px;
  text-transform: uppercase;
`;

type RaceLayoutProps = {
  race: Race | null
}

export const RaceInfo: NextPageWithLayout<RaceLayoutProps> = ({ children  , race }) => {
  return (
    <>
      <Spacer mt={Space * 2} />
      <Heading as="h1">{race?.name}</Heading>
      <p>
        開始 {formatTime(race?.startAt ?? "")} 締切 {formatTime(race?.closeAt ?? "")}
      </p>

      <Spacer mt={Space * 2} />

      <Section dark shrink>
        <LiveBadge>Live</LiveBadge>
        <Spacer mt={Space * 2} />
        <TrimmedImage height={225} src={race?.image ?? ""} width={400} />
      </Section>

      <Spacer mt={Space * 2} />
    </>
  );
};



type RaceTabNavContentsProps = {
  race: Race | null;
};

export const RaceTabNavContents: NextPageWithLayout<RaceTabNavContentsProps> = ({ children, race }) => {
  const router = useRouter();
  const paths = router.asPath.split("/");

  const [currentPage, setCurrentPage] = useState(paths[paths.length - 1]);

  return (
    <>
      <Section>
        <TabNav>
          <TabNav.Item
            aria-current={currentPage === "race-card"}
            onClick={() => setCurrentPage("race-card")}
            href={`/races/${race?.id}/race-card`}
          >
            出走表
          </TabNav.Item>
          <TabNav.Item
            aria-current={currentPage === "odds"}
            onClick={() => setCurrentPage("odds")}
            href={`/races/${race?.id}/odds`}
          >
            オッズ
          </TabNav.Item>
          <TabNav.Item
            aria-current={currentPage === "result"}
            onClick={() => setCurrentPage("result")}
            href={`/races/${race?.id}/result`}
          >
            結果
          </TabNav.Item>
        </TabNav>
        {children}
      </Section>
    </>
  );
};
