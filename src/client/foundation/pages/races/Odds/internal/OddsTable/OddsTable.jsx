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

const without = (arr, ...args) => arr.filter((item) => !args.includes(item));

const range = (start, end, increment) => {
  // if the end is not defined...
  const isEndDef = typeof end !== "undefined";
  // ...the first argument should be the end of the range...
  end = isEndDef ? end : start;
  // ...and 0 should be the start
  start = isEndDef ? start : 0;

  // if the increment is not defined, we could need a +1 or -1
  // depending on whether we are going up or down
  if (typeof increment === "undefined") {
    increment = Math.sign(end - start);
  }

  // calculating the lenght of the array, which has always to be positive
  const length = Math.abs((end - start) / (increment || 1));

  // In order to return the right result, we need to create a new array
  // with the calculated length and fill it with the items starting from
  // the start value + the value of increment.
  const { result } = Array.from({ length }).reduce(
    ({ result, current }) => ({
      // append the current value to the result array
      result: [...result, current],
      // adding the increment to the current item
      // to be used in the next iteration
      current: current + increment,
    }),
    { current: start, result: [] },
  );

  return result;
};

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
