import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useAuth, useRegister } from "../../../contexts/AuthContext";
import { Color, FontSize, Radius, Space } from "../../../styles/variables";
import { BaseButton } from "../../buttons/BaseButton";

const Wrapper = styled.div`
  align-items: center;
  background: ${Color.mono[600]};
  color: ${Color.mono[0]};
  display: flex;
  height: 80px;
  justify-content: space-between;
  padding: 0 ${Space * 2}px;
`;

const NameText = styled.h1`
  color: ${Color.green[400]};
  font-size: ${FontSize.LARGE};
  font-weight: bold;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const LoginButton = styled(BaseButton)`
  background: ${Color.mono[0]};
  border-radius: ${Radius.MEDIUM};
  color: ${Color.mono[800]};
  padding: ${Space * 1}px ${Space * 2}px;

  &:hover {
    background: ${Color.mono[200]};
  }
`;

/** @type {React.VFC} */
export const Header = () => {
  const { loggedIn } = useAuth();
  const register = useRegister();

  const handleClickLoginButton = useCallback(() => {
    register();
  }, [register]);

  return (
    <Wrapper>
      <NameText>
        <Link to="/">CyberTicket</Link>
      </NameText>

      {loggedIn ? (
        <div>ログイン中です</div>
      ) : (
        <LoginButton onClick={handleClickLoginButton}>ログイン</LoginButton>
      )}
    </Wrapper>
  );
};
