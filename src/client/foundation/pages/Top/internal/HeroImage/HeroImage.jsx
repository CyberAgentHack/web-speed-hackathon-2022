import React from "react";
import styled from "styled-components";

/** @type {React.VFC<Props>} */
export const HeroImage = ({ url }) => {
  return (
    <Wrapper>
      <Img alt="" loading="lazy" src={url} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  &:before {
    content: "";
    display: block;
    padding-top: calc(((3 / 4) * 100%));
  }
`;
const Img = styled.img`
  display: block;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  //box-sizing: border-box;
`;
