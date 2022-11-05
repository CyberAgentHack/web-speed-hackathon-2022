import { range, without } from "lodash-es";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

import { BaseButton } from "../../../../../components/buttons/BaseButton";
import { Spacer } from "../../../../../components/layouts/Spacer";
import { Stack } from "../../../../../components/layouts/Stack";
import { Color, FontSize, Space } from "../../../../../styles/variables";
import { OddsMarker } from "../OddsMarker";

const ScrollWrapper = styled.div`
  overflow-x: auto;
`;

const RankLabel = styled.label`
  width: 64px;
`;

const Table = styled.table`
  border-collapse: collapse;
  border-color: ${Color.mono[800]};
  border-style: solid;
  border-width: 2px 0 2px;
  font-size: ${FontSize.SMALL};
  height: 100%;
  min-width: calc(1024px - ${Space * 3}px * 2);
  table-layout: fixed;
  text-align: center;
  width: 100%;

  th,
  td {
    border-color: ${Color.mono[800]};
    border-style: solid;
    border-width: 1px;
    height: 100%;
    padding: 0;
  }

  th {
    font-weight: normal;
    padding: 0 ${Space * 1}px;
  }
`;

const BuyButton = styled(BaseButton)`
  height: 100%;
  padding: ${Space * 2}px;
  width: 100%;

  &:disabled {
    background: ${Color.mono[100]};
  }

  &:not(:disabled):hover {
    background: ${Color.mono[200]};
  }
`;

const InactiveBuyButton = styled.div`
  cursor: default;
  height: 100%;
  padding: ${Space * 2}px;
  width: 100%;
`;

/**
 * @param {number} second
 * @param {number} third
 * @returns {string}
 */
const mapKey = (second, third) => `${second}.${third}`;

/**
 * @typedef Props
 * @property {Model.OddsItem[]} odds
 * @property {Model.RaceEntry[]} entries
 * @property {boolean} isRaceClosed
 * @property {(odds: Model.OddsItem) => void} onClickOdds
 */

/** @type {React.VFC<Props>} */
export const OddsTable = ({ entries, isRaceClosed, odds, onClickOdds }) => {
  const [firstKey, setFirstKey] = useState(1);

  const handleChange = useCallback((e) => {
    setFirstKey(parseInt(e.currentTarget.value, 10));
  }, []);

  const headNumbers = without(range(1, entries.length + 1), firstKey);

  const filteredOdds = odds.filter((item) => item.key[0] === firstKey);
  const oddsMap = filteredOdds.reduce((acc, cur) => {
    const [, second, third] = cur.key;
    acc[mapKey(second, third)] = cur;
    return acc;
  }, {});

  return (
    <div>
      <Stack horizontal>
        <RankLabel>1位軸</RankLabel>
        <select onChange={handleChange} value={firstKey}>
          {entries.map((entry) => (
            <option key={entry.id} value={entry.number}>
              {entry.number}. {entry.player.name}
            </option>
          ))}
        </select>
      </Stack>

      <Spacer mt={Space * 2} />
      <ScrollWrapper>
        <div>
          <Table>
            <thead>
              <tr>
                <th width="64px">2位</th>
                <th width="32px"></th>

                {headNumbers.map((second) => (
                  <th key={second} width="auto">
                    {second}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {headNumbers.map((third, i) => (
                <tr key={third}>
                  {i === 0 && <th rowSpan={headNumbers.length}>3位</th>}

                  <th>{third}</th>

                  {headNumbers.map((second) => {
                    const item = oddsMap[mapKey(second, third)];

                    return (
                      <td key={second} width="auto">
                        {second !== third ? (
                          isRaceClosed ? (
                            <InactiveBuyButton>
                              <OddsMarker odds={item.odds} />
                            </InactiveBuyButton>
                          ) : (
                            <BuyButton onClick={() => onClickOdds(item)}>
                              <OddsMarker odds={item.odds} />
                            </BuyButton>
                          )
                        ) : (
                          <BuyButton disabled>-</BuyButton>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </ScrollWrapper>
    </div>
  );
};
