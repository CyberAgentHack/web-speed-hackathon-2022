import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background: #57534e;
  color: #fff;
  font-size: 0.875rem;
  margin-top: ${40}px;
  padding: ${40}px ${40}px;
`;

const List = styled.ul`
  @media (min-width: 1024px) {
    display: flex;
    justify-content: flex-start;
  }
`;

const ListItem = styled.li`
  cursor: pointer;
  margin-top: ${16}px;

  @media (min-width: 1024px) {
    margin-right: ${16}px;
    margin-top: 0;
  }

  &:hover {
    color: #d6d3d1;
  }
`;

const NameText = styled.h1`
  color: #4ade80;
  font-size: 2rem;
  font-weight: bold;
  margin: ${32}px 0;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const WarningText = styled.p`
  color: #d6d3d1;
  font-size: 0.75rem;
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
