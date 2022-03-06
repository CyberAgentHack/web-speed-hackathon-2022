import React from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";

import { Container } from "../../components/layouts/Container";
import { Section } from "../../components/layouts/Section";
import { Spacer } from "../../components/layouts/Spacer";
import { TrimmedImage } from "../../components/media/TrimmedImage";
import { Heading } from "../../components/typographies/Heading";
import { OutletContext } from "../../contexts/OutletContext";
import { useFetch } from "../../hooks/useFetch";
import { Color, Radius, Space } from "../../styles/variables";
import { formatTime } from "../../utils/DateUtils";
import { jsonFetcher } from "../../utils/HttpUtils";

const LiveBadge = styled.span`
  background: ${Color.red};
  border-radius: ${Radius.SMALL};
  color: ${Color.mono[0]};
  font-weight: bold;
  padding: ${Space * 1}px;
  text-transform: uppercase;
`;

/** @type {React.VFC} */
export const RaceLayout = () => {
  const { raceId } = useParams();
  const { data } = useFetch(`/api/races/${raceId}`, jsonFetcher);

  if (data == null) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <OutletContext.Provider value={data}>
        <Spacer mt={Space * 2} />
        <Heading as="h1">{data.name}</Heading>
        <p>
          開始 {formatTime(data.startAt)} 締切 {formatTime(data.closeAt)}
        </p>

        <Spacer mt={Space * 2} />

        <Section dark shrink>
          <LiveBadge>Live</LiveBadge>
          <Spacer mt={Space * 2} />
          <TrimmedImage
            alt={"LIVE"}
            height={225}
            src={data.image}
            width={400}
          />
        </Section>

        <Spacer mt={Space * 2} />

        <Outlet />
      </OutletContext.Provider>
    </Container>
  );
};
