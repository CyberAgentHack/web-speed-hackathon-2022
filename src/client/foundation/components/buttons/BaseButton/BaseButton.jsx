import React from "react";

import styles from "./BaseButton.module.scss"

/**
 * @typedef Props
 * @property {string=} className
 */

/** @type {React.FC<Props & React.ButtonHTMLAttributes>} */
export const BaseButton = (props) => {
  return <button className={styles.Wrapper} {...props} />;
};
