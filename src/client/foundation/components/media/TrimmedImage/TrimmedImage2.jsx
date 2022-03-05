/* eslint-disable react/jsx-sort-props */
import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

const ImageBlock = styled.div`
  aspect-ratio: 16 / 9;
  display: block;
  padding-top: 56.25%;
  width: ${({ theme }) => theme.width}px;
`;

const Image = styled.img`
  max-height: 100%;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage2 = ({ src, width }) => (
  <Container>
    <ImageBlock theme={{ width: width }}>
      <Image src={src} loading="lazy" />
    </ImageBlock>
  </Container>
);
