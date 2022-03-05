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
  return (
    <Picture alt="" src={url}>
      <source srcSet={optimizedImage(url, 400)} media="(max-width: 400px)" />
        <source srcSet={optimizedImage(url, 800)} media="(max-width: 800px)" />
        <source srcSet={optimizedImage(url, 1024)} media="(min-width: 1024px)" />
        <img src={url} alt="" />
    </Picture>
  )
});
