import React, { useState } from "react";
import styled from "styled-components";

import { Container } from "@/foundation/components/layouts/Container";
import { Section } from "@/foundation/components/layouts/Section";
import { Spacer } from "@/foundation/components/layouts/Spacer";
import { TrimmedImage } from "@/foundation/components/media/TrimmedImage";
import { TabNav } from "@/foundation/components/navs/TabNav";
import { Heading } from "@/foundation/components/typographies/Heading";
import { useFetch } from "@/foundation/hooks/useFetch";
import { Color, Radius, Space } from "@/foundation/styles/variables";
import { formatTime } from "@/foundation/utils/DateUtils";
import { jsonFetcher } from "@/foundation/utils/HttpUtils";
import { useRouter } from "next/router";
import CommonLayout from "@/foundation/pages/CommonLayout";

const LiveBadge = styled.span`
  background: ${Color.red};
  border-radius: ${Radius.SMALL};
  color: ${Color.mono[0]};
  font-weight: bold;
  padding: ${Space * 1}px;
  text-transform: uppercase;
`;

/**
 * @type {React.VFC}
 */
export const RaceTabNavContents = ({ children, raceId }) => {
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
            href={`/races/${raceId}/race-card`}
          >
            出走表
          </TabNav.Item>
          <TabNav.Item
            aria-current={currentPage === "odds"}
            onClick={() => setCurrentPage("odds")}
            href={`/races/${raceId}/odds`}
          >
            オッズ
          </TabNav.Item>
          <TabNav.Item
            aria-current={currentPage === "result"}
            onClick={() => setCurrentPage("result")}
            href={`/races/${raceId}/result`}
          >
            結果
          </TabNav.Item>
        </TabNav>
        {children}
      </Section>
    </>
  );
};

/**
 * @type {React.VFC}
 */
export default function RaceLayout({ children }) {
  const router = useRouter();
  const { raceId } = router.query;
  const { data: race } = useFetch(`/api/races/${raceId}`, jsonFetcher);

  return (
    <CommonLayout>
      <Container>
        <Spacer mt={Space * 2} />
        <Heading as="h1">{race?.name}</Heading>
        <p>
          開始 {formatTime(race?.startAt)} 締切 {formatTime(race?.closeAt)}
        </p>

        <Spacer mt={Space * 2} />

        <Section dark shrink>
          <LiveBadge>Live</LiveBadge>
          <Spacer mt={Space * 2} />
          <TrimmedImage height={225} src={race ? race.image : ""} width={400} />
        </Section>

        <Spacer mt={Space * 2} />

        <RaceTabNavContents children={children} raceId={raceId} />
      </Container>
    </CommonLayout>
  );
}
