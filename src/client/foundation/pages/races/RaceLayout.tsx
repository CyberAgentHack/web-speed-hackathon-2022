import { Section } from "foundation/components/layouts/Section";
import { Spacer } from "foundation/components/layouts/Spacer";
import { TrimmedImage } from "foundation/components/media/TrimmedImage";
import { TabNav } from "foundation/components/navs/TabNav";
import { Heading } from "foundation/components/typographies/Heading";
import { Space } from "foundation/styles/variables";
import { formatTime } from "foundation/utils/DateUtils";
import { NextPageWithLayout } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Race } from "../../../../model";

import styles from "./RaceLayout.module.scss"

type RaceLayoutProps = {
  race: Race | null;
};

export const RaceInfo: NextPageWithLayout<RaceLayoutProps> = ({ race }) => {
  return (
    <>
      <Spacer mt={Space * 2} />
      <Heading as="h1">{race?.name}</Heading>
      <p>
        開始 {race ? formatTime(race.startAt) : ""} 締切 {race ? formatTime(race.closeAt) : ""}
      </p>

      <Spacer mt={Space * 2} />

      <Section dark shrink>
        <span className={styles.LiveBadge}>Live</span>
        <Spacer mt={Space * 2} />
        <TrimmedImage height={225} src={race?.image ?? ""} width={400} priority />
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
  );
};
