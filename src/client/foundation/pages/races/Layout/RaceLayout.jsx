import React, { Suspense, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

import { Container } from "../../../components/layouts/Container";
import { Section } from "../../../components/layouts/Section";
import { Spacer } from "../../../components/layouts/Spacer";
import { TrimmedImage } from "../../../components/media/TrimmedImage";
import { TabNav } from "../../../components/navs/TabNav";
import { Heading } from "../../../components/typographies/Heading";
import { useFetch } from "../../../hooks/useFetch";
import { Color, Radius, Space } from "../../../styles/variables";
import { formatTime } from "../../../utils/DateUtils";
import { jsonFetcher } from "../../../utils/HttpUtils";

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
export const RaceTabNavContents = ({ data, raceId }) => {
  const location = useLocation();
  const paths = location.pathname.split("/");

  const [currentPage, setCurrentPage] = useState(paths[paths.length - 1]);

  return (
    <>
      <Section>
        <TabNav>
          <TabNav.Item aria-current={currentPage === "race-card"} onClick={() => setCurrentPage("race-card")} to={`/races/${raceId}/race-card`}>出走表</TabNav.Item>
          <TabNav.Item aria-current={currentPage === "odds"} onClick={() => setCurrentPage("odds")} to={`/races/${raceId}/odds`}>オッズ</TabNav.Item>
          <TabNav.Item aria-current={currentPage === "result"} onClick={() => setCurrentPage("result")} to={`/races/${raceId}/result`}>結果</TabNav.Item>
        </TabNav>

        <Spacer mt={Space * 2} />

        <Suspense fallback={<div>Loading...</div>}>
          <Outlet context={{ data, raceId, setCurrentPage }} />
        </Suspense>
      </Section>
    </>
  );
};


/**
 * @type {React.VFC}
 */
export const RaceLayout = () => {
  const { raceId } = useParams();

  const { data } = useFetch(`/api/races/${raceId}`, jsonFetcher);

  if (data == null) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Spacer mt={Space * 2} />
      <Heading as="h1">{data.name}</Heading>
      <p>
        開始 {formatTime(data.startAt)} 締切 {formatTime(data.closeAt)}
      </p>

      <Spacer mt={Space * 2} />

      <Section dark shrink>
        <LiveBadge>Live</LiveBadge>
        <Spacer mt={Space * 2} />
        <TrimmedImage height={225} src={data.image} width={400} />
      </Section>

      <Spacer mt={Space * 2} />

      <RaceTabNavContents data={data} raceId={raceId} />
    </Container>
  );
};
