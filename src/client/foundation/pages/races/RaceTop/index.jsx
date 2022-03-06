import moment from "moment-timezone";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Container } from "../../../components/layouts/Container";
import { Section } from "../../../components/layouts/Section";
import { Spacer } from "../../../components/layouts/Spacer";
import { Stack } from "../../../components/layouts/Stack";
import { TrimmedImage } from "../../../components/media/TrimmedImage";
import { Heading } from "../../../components/typographies/Heading.jsx";
import { useAuthorizedFetch } from "../../../hooks/useAuthorizedFetch";
import { useFetch } from "../../../hooks/useFetch";
import { BreakPoint, Color, Radius, Space } from "../../../styles/variables";
import { formatTime } from "../../../utils/DateUtils";
import { authorizedJsonFetcher, jsonFetcher } from "../../../utils/HttpUtils";
import { OddsRankingList } from "../Odds/internal/OddsRankingList";
import { OddsTable } from "../Odds/internal/OddsTable";
import { TicketVendingModal } from "../Odds/internal/TicketVendingModal";
import { EntryTable } from "../RaceCard/internal/EntryTable";
import { PlayerPictureList } from "../RaceCard/internal/PlayerPictureList";
import { BettingTicketList } from "../RaceResult/internal/BettingTicketList";
import { RaceResultSection } from "../RaceResult/internal/RaceResultSection";

const LiveBadge = styled.span`
  background: ${Color.red};
  border-radius: ${Radius.SMALL};
  color: ${Color.mono[0]};
  font-weight: bold;
  padding: ${Space * 1}px;
  text-transform: uppercase;
`;

const Callout = styled.aside`
  align-items: center;
  background: ${({ $closed }) =>
    $closed ? Color.mono[200] : Color.green[100]};
  color: ${({ $closed }) => ($closed ? Color.mono[600] : Color.green[500])};
  display: flex;
  font-weight: bold;
  gap: ${Space * 2}px;
  justify-content: left;
  padding: ${Space * 1}px ${Space * 2}px;
`;

/**
 * @typedef ItemProps
 * @property {string} to
 */

const ItemWrapper = styled.li`
  a {
    border: 1px solid ${Color.mono[400]};
    border-radius: ${Radius.MEDIUM};
    display: block;
    font-weight: bold;
    padding-bottom: ${Space * 1}px;
    padding-top: ${Space * 1}px;
    text-align: center;
    width: 96px;

    &:hover {
      border-color: ${Color.mono[600]};
    }

    &[aria-current] {
      background: ${Color.mono[900]};
      color: ${Color.mono[0]};
    }

    @media (min-width: ${BreakPoint.TABLET}px) {
      width: 160px;
    }
  }
`;

/** @type {React.VFC} */
export const RaceHome = () => {
  const { raceId } = useParams();
  const { data } = useFetch(`/api/races/${raceId}`, jsonFetcher);
  const { data: ticketData, revalidate } = useAuthorizedFetch(
    `/api/races/${raceId}/betting-tickets`,
    authorizedJsonFetcher,
  );
  const [oddsKeyToBuy, setOddsKeyToBuy] = useState(null);
  const modalRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [done, setDone] = useState(false);

  const handleClickOdds = useCallback(
    /**
     * @param {Model.OddsItem} odds
     */
    (odds) => {
      setOddsKeyToBuy(odds.key);
      modalRef.current?.showModal();
    },
    [],
  );

  useEffect(() => {
    revalidate();
  }, [done]);

  if (data == null) {
    return <Container>Loading...</Container>;
  }

  const isRaceClosed = moment(data.closeAt).isBefore(new Date());

  /** @type {React.FC<ItemProps & React.AnchorHTMLAttributes>} */
  const Item = ({ "aria-current": ariaCurrent, children, status, ...rest }) => {
    ariaCurrent = status == currentPage;
    return (
      <ItemWrapper>
        {ariaCurrent ? (
          <a aria-current {...rest}>
            {children}
          </a>
        ) : (
          <a {...rest} onClick={() => setCurrentPage(status)}>
            {children}
          </a>
        )}
      </ItemWrapper>
    );
  };

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

      <Section>
        <nav>
          <Stack horizontal as="ul" gap={Space * 2}>
            <Item status={0}>出走表</Item>
            <Item status={1}>オッズ</Item>
            <Item status={2}>結果</Item>
          </Stack>
        </nav>

        {/* race-card */}
        {currentPage == 0 ? (
          <>
            <Spacer mt={Space * 2} />
            <PlayerPictureList>
              {data.entries.map((entry) => (
                <PlayerPictureList.Item
                  key={entry.id}
                  image={entry.player.image}
                  name={entry.player.name}
                  number={entry.number}
                />
              ))}
            </PlayerPictureList>
            <Spacer mt={Space * 4} />
            <EntryTable entries={data.entries} />
          </>
        ) : currentPage == 1 ? (
          <>
            <Spacer mt={Space * 4} />
            <Callout $closed={isRaceClosed}>
              <i className="fas fa-info-circle" />
              {isRaceClosed
                ? "このレースの投票は締め切られています"
                : "オッズをクリックすると拳券が購入できます"}
            </Callout>
            <Spacer mt={Space * 4} />
            <Heading as="h2">オッズ表</Heading>
            <Spacer mt={Space * 2} />
            <OddsTable
              entries={data.entries}
              isRaceClosed={isRaceClosed}
              odds={data.trifectaOdds}
              onClickOdds={handleClickOdds}
            />
            <Spacer mt={Space * 4} />
            <Heading as="h2">人気順</Heading>
            <Spacer mt={Space * 2} />
            <OddsRankingList
              isRaceClosed={isRaceClosed}
              odds={data.trifectaOdds}
              onClickOdds={handleClickOdds}
            />
          </>
        ) : (
          <>
            <Spacer mt={Space * 4} />
            <Heading as="h2">購入した買い目</Heading>
            <Spacer mt={Space * 2} />
            <BettingTicketList>
              {(ticketData?.bettingTickets ?? []).map((ticket) => (
                <BettingTicketList.Item key={ticket.id} ticket={ticket} />
              ))}
            </BettingTicketList>
            <Spacer mt={Space * 4} />
            <Heading as="h2">勝負結果</Heading>
            <Spacer mt={Space * 2} />
            <RaceResultSection />
          </>
        )}
      </Section>
      {currentPage == 1 && (
        <>
          <TicketVendingModal
            ref={modalRef}
            odds={oddsKeyToBuy}
            raceId={raceId}
            setDone={setDone}
          />
        </>
      )}
    </Container>
  );
};
