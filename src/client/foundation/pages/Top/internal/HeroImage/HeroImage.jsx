import React, { memo } from "react";
import styled from "styled-components";
import { optimizedImage } from "../../../../utils/UrlUtils";

const Picture = styled.picture`
  display: block;
  margin: 0 auto;
  aspect-ratio: 4320 / 3099;
`;

/**
 * @typedef Props
 * @type {object}
 * @property {string} url
 */

/** @type {React.VFC<Props>} */
export const HeroImage = memo(({ url }) => {
  const smaller = (suffix) => {
    return url.replace(".jpg", `.jpg_${suffix}.avif`);
  }

  return (
    <Picture alt="" src={url}>
        <source srcSet={smaller("small")} media="(max-width: 600px)" />
        <source srcSet={smaller("1024")} media="(min-width: 601px)" />
        <img src={url} alt="" /> {/* original for high resolution screen */}
    </Picture>
  )
});
