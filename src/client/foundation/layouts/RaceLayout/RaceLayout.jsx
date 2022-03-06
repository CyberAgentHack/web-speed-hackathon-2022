import React, { useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";

import { Container } from "../../components/layouts/Container";
import { Section } from "../../components/layouts/Section";
import { Spacer } from "../../components/layouts/Spacer";
import { TrimmedImage } from "../../components/media/TrimmedImage";
import { Heading } from "../../components/typographies/Heading";
import { useFetch } from "../../hooks/useFetch";
import { Color, Radius, Space } from "../../styles/variables";
import { formatTime } from "../../utils/DateUtils";
import { jsonFetcher } from "../../utils/HttpUtils";

import { Tab } from "./internal/Tab";

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

  const context = useMemo(() => ({ raceDetail: data, raceId }), [data, raceId]);

  return (
    <Container>
      <Spacer mt={Space * 2} />
      <Heading as="h1">{data?.name ?? "　"}</Heading>
      <p>
        {/* TODO: replace correct placeholder */}
        開始 {data == null ? "0:00" : formatTime(data.startAt)} 締切{" "}
        {data == null ? "0:00" : formatTime(data.closeAt)}
      </p>

      <Spacer mt={Space * 2} />

      <Section dark shrink>
        <LiveBadge>Live</LiveBadge>
        <Spacer mt={Space * 2} />
        <TrimmedImage
          height={225}
          objectFit="contain"
          src={data == null ? null : data.image.split(".jpg")[0] + "_md.webp"}
          width={400}
        />
      </Section>

      <Spacer mt={Space * 2} />

      <Section>
        <Tab raceId={raceId} />
        {/* NOTE: もう少し実装方法を考えたい（Context APIなど）が、暫定でOutletにPropsを渡す */}
        <Outlet context={context} />
      </Section>
    </Container>
  );
};
