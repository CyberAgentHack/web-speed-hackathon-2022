import React from "react";
import styled from "styled-components";

import { Color, FontSize, Space } from "../../../../../styles/variables";

const Wrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  border-collapse: collapse;
  border-color: ${Color.mono[800]};
  border-style: solid;
  border-width: 2px 0 2px;
  font-size: ${FontSize.SMALL};
  min-width: calc(1024px - ${Space * 3}px * 2);
  text-align: center;
  width: 100%;

  th,
  td {
    border-color: ${Color.mono[800]};
    border-style: solid;
    border-width: 1px 1px 1px 0;
  }

  th {
    font-weight: normal;
    padding: 0 ${Space * 1}px;
  }

  thead tr:first-child th:last-child {
    border-right-width: 0;
  }

  td {
    padding: ${Space * 1}px;
    &:last-child {
      border-right-width: 0;
    }
  }
`;

const TableHCell = styled.th`
  font-weight: ${({ $bold }) => $bold && "bold"};
  text-align: ${({ $align }) => $align};
`;

const TableCell = styled.td`
  font-weight: ${({ $bold }) => $bold && "bold"};
  text-align: ${({ $align }) => $align};
`;

/**
 * @typedef Props
 * @property {Model.RaceEntry[]} entries
 */

/** @type {React.VFC<Props>} */
export const EntryTable = ({ entries }) => {
  return (
    <Wrapper>
      <Table>
        <thead>
          <tr>
            <TableHCell rowSpan={2} width="48px">
              番号
            </TableHCell>
            <TableHCell $align="left" rowSpan={2}>
              選手名
            </TableHCell>
            <TableHCell rowSpan={2} width="48px">
              予想
            </TableHCell>
            <TableHCell colSpan={3}>決まり手</TableHCell>

            <TableHCell rowSpan={2} width="24px">
              1位
            </TableHCell>
            <TableHCell rowSpan={2} width="24px">
              2位
            </TableHCell>
            <TableHCell rowSpan={2} width="24px">
              3位
            </TableHCell>
            <TableHCell rowSpan={2} width="24px">
              着外
            </TableHCell>

            <TableHCell rowSpan={2} width="80px">
              勝率
            </TableHCell>
            <TableHCell rowSpan={2} width="80px">
              3位内率
            </TableHCell>

            <TableHCell $align="left" rowSpan={2} width="250px">
              コメント
            </TableHCell>
          </tr>
          <tr>
            <TableHCell width="64px">グー</TableHCell>
            <TableHCell width="64px">チョキ</TableHCell>
            <TableHCell width="64px">パー</TableHCell>
          </tr>
        </thead>
        <tbody>
          {(entries ?? [...Array(12).keys()]).map((entry) => (
            <tr key={entry.id ?? entry}>
              <TableCell>{entry.number ?? entry}</TableCell>
              <TableCell $bold $align="left">
                {entry.player?.name ?? "〇〇〇〇"}
              </TableCell>
              <TableCell>{entry.predictionMark ?? ""}</TableCell>

              <TableCell>{entry.rockWin ?? "0"}</TableCell>
              <TableCell>{entry.scissorsWin ?? "0"}</TableCell>
              <TableCell>{entry.paperWin ?? "0"}</TableCell>

              <TableCell>{entry.first ?? "0"}</TableCell>
              <TableCell>{entry.second ?? "0"}</TableCell>
              <TableCell>{entry.third ?? "0"}</TableCell>
              <TableCell>{entry.others ?? "0"}</TableCell>

              <TableCell>{entry.firstRate?.toFixed(1) ?? "00.0"}</TableCell>
              <TableCell>{entry.thirdRate?.toFixed(1) ?? "00.0"}</TableCell>

              <TableCell $align="left">
                {entry.comment ?? "Loading..."}
              </TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};
