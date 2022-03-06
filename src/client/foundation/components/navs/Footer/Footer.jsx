import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { BreakPoint, Color, FontSize, Space } from "../../../styles/variables";

const Wrapper = styled.div`
  background: ${Color.mono[600]};
  color: ${Color.mono[0]};
  font-size: ${FontSize.SMALL};
  margin-top: ${Space * 5}px;
  padding: ${Space * 5}px ${Space * 5}px;
`;

const List = styled.ul`
  @media (min-width: ${BreakPoint.TABLET}px) {
    display: flex;
    justify-content: flex-start;
  }
`;

const ListItem = styled.li`
  cursor: pointer;
  margin-top: ${Space * 2}px;

  @media (min-width: ${BreakPoint.TABLET}px) {
    margin-right: ${Space * 2}px;
    margin-top: 0;
  }

  &:hover {
    color: ${Color.mono[300]};
  }
`;

const NameText = styled.h1`
  color: ${Color.green[400]};
  font-size: ${FontSize.XX_LARGE};
  font-weight: bold;
  margin: ${Space * 4}px 0;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const WarningText = styled.p`
  color: ${Color.mono[300]};
  font-size: ${FontSize.X_SMALL};
`;

/** @type {React.VFC} */
export const Footer = () => {
  return (
    <Wrapper>
      <List>
        <ListItem>ヘルプ</ListItem>
        <ListItem>お問い合わせ</ListItem>
        <ListItem>広告ガイドライン</ListItem>
        <ListItem>運営会社</ListItem>
        <ListItem>利用規約</ListItem>
        <ListItem>特定商取引法</ListItem>
        <ListItem>プライバシーポリシー</ListItem>
      </List>

      <NameText>
        <Link to="/">CyberTicket</Link>
      </NameText>

      <WarningText>
        じゃんけんはどこの国の商標でもなく、中国から九州に伝来した虫拳に由来する日本の遊戯です。拳券の購入は20歳になってから。じゃんけんは適度に楽しみましょう。
      </WarningText>
    </Wrapper>
  );
};
