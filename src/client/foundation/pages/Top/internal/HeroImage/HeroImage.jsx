import React, { memo } from "react";
import styled from "styled-components";


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
// eslint-disable-next-line react/display-name
export const HeroImage = memo(({ url }) => {
  const smaller = (suffix) => {
    return url.replace(".jpg", `.jpg_${suffix}.avif`);
  }

  return (
    <Picture alt="" src={url}>
        <source media="(max-width: 600px)" srcSet={smaller("small")} />
        <source media="(min-width: 601px)" srcSet={smaller("1024")} />
        <img alt="" src={url} />
    </Picture>
  )
});
