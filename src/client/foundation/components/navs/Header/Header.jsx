import React, { useCallback } from "react";
import Link from "next/link";

import { useAuth, useRegister } from "../../../contexts/AuthContext";

import styles from "./Header.module.scss"

/** @type {React.VFC} */
export const Header = () => {
  const { loggedIn } = useAuth();
  const register = useRegister();

  const handleClickLoginButton = useCallback(() => {
    register();
  }, [register]);

  return (
    <div className={styles.Wrapper}>
      <h1 className={styles.NameText}>
        <Link className={styles.NameTextLink} href={"/"}>CyberTicket</Link>
      </h1>

      {loggedIn ? <div>ログイン中です</div> : <button className={styles.LoginButton} onClick={handleClickLoginButton}>ログイン</button>}
    </div>
  );
};
