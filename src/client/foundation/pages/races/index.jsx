import moment from "moment-timezone";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { Container } from "../../components/layouts/Container";
import { Section } from "../../components/layouts/Section";
import { Spacer } from "../../components/layouts/Spacer";
import { Stack } from "../../components/layouts/Stack";
import { TrimmedImage } from "../../components/media/TrimmedImage";
import { Heading } from "../../components/typographies/Heading.jsx";
import { useAuthorizedFetch } from "../../hooks/useAuthorizedFetch";
import { useFetch } from "../../hooks/useFetch";
import { BreakPoint, Color, Radius, Space } from "../../styles/variables";
import { formatTime } from "../../utils/DateUtils";
import { authorizedJsonFetcher, jsonFetcher } from "../../utils/HttpUtils";

import { OddsRankingList } from "./Odds/OddsRankingList";
import { OddsTable } from "./Odds/OddsTable";
import { TicketVendingModal } from "./Odds/TicketVendingModal";
import { EntryTable } from "./RaceCard/EntryTable";
import { PlayerPictureList } from "./RaceCard/PlayerPictureList";
import { BettingTicketList } from "./RaceResult/BettingTicketList";
import { RaceResultSection } from "./RaceResult/RaceResultSection";

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
export const RaceHome = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
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
  const query = location.pathname.split(`${raceId}`)[1];
  let isFirstRendering = useRef(false);
  useEffect(() => {
    isFirstRendering.current = true;
  }, []);
  useEffect(() => {
    if (!isFirstRendering.current) {
      if (currentPage == 0) {
        navigate(`/races/${raceId}/race-card`);
      } else if (currentPage == 1) {
        navigate(`/races/${raceId}/odds`);
      } else {
        navigate(`/races/${raceId}/result`);
      }
    } else {
      if (query == "/race-card") {
        setCurrentPage(0);
      } else if (query == "/odds") {
        setCurrentPage(1);
      } else {
        setCurrentPage(2);
      }
      isFirstRendering.current = false;
    }
  }, [currentPage]);

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

  const ReceHeader = memo(() => {
    return (
      <>
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
      </>
    );
  });
  ReceHeader.displayName = "ReceHeader";

  const RaceCard = memo(() => {
    return (
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
    );
  });
  RaceCard.displayName = "RaceCard";

  const Odds = memo(() => {
    return (
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
    );
  });
  Odds.displayName = "Odds";

  const Result = memo(() => {
    return (
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
    );
  });
  Result.displayName = "Result";

  /** @type {React.FC<ItemProps & React.AnchorHTMLAttributes>} */
  const Item = memo(
    ({ "aria-current": ariaCurrent, children, status, ...rest }) => {
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
    },
  );
  Item.displayName = "Item";

  return (
    <Container>
      <ReceHeader />

      <Section>
        <nav>
          <Stack horizontal as="ul" gap={Space * 2}>
            <Item status={0}>出走表</Item>
            <Item status={1}>オッズ</Item>
            <Item status={2}>結果</Item>
          </Stack>
        </nav>

        {currentPage == 0 ? (
          <RaceCard />
        ) : currentPage == 1 ? (
          <Odds />
        ) : (
          <Result />
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
});
RaceHome.displayName = "RaceHome";
