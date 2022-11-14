import React from "react";
import Link from "next/link";

import styles from "./Footer.module.scss"

/** @type {React.VFC} */
export const Footer = () => {
  return (
    <div className={styles.Wrapper}>
      <ul className={styles.List}>
        <li className={styles.ListItem}>ヘルプ</li>
        <li className={styles.ListItem}>お問い合わせ</li>
        <li className={styles.ListItem}>広告ガイドライン</li>
        <li className={styles.ListItem}>運営会社</li>
        <li className={styles.ListItem}>利用規約</li>
        <li className={styles.ListItem}>特定商取引法</li>
        <li className={styles.ListItem}>プライバシーポリシー</li>
      </ul>

      <h1 className={styles.NameText}>
        <Link className={styles.NameTextLink} href={"/"}>CyberTicket</Link>
      </h1>

      <p className={styles.WarningText}>
        じゃんけんはどこの国の商標でもなく、中国から九州に伝来した虫拳に由来する日本の遊戯です。拳券の購入は20歳になってから。じゃんけんは適度に楽しみましょう。
      </p>
    </div>
  );
};
