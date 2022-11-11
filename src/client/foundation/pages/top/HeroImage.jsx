import React from "react";
import Image from "next/image";

/**
 * @typedef Props
 * @type {object}
 */

/** @type {React.VFC<Props>} */
export default function HeroImage() {
  return (
    <Image
      alt=""
      height={735}
      src={"/assets/images/hero.webp"}
      width={1024}
      style={{ display: "block", margin: "0 auto", height: "auto" }}
      unoptimized
      priority
    />
  );
}
