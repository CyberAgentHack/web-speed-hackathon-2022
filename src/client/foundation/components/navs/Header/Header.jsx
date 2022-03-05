import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useAuth, useRegister } from "../../../contexts/AuthContext";
import { BaseButton } from "../../buttons/BaseButton";

const Wrapper = styled.div`
  align-items: center;
  background: #57534e;
  color: #fff;
  display: flex;
  height: 80px;
  justify-content: space-between;
  padding: 0 ${8 * 2}px;
`;

const NameText = styled.h1`
  color: #4ade80;
  font-size: 1.25rem;
  font-weight: bold;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const LoginButton = styled(BaseButton)`
  background: #fff;
  border-radius: 12px;
  color: #292524;
  padding: ${8 * 1}px ${8 * 2}px;

  &:hover {
    background: #e7e5e4;
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
