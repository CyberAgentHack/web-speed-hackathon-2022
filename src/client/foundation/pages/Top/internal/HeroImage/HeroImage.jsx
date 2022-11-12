import React from "react";
import styled from "styled-components";

/** @type {React.VFC<Props>} */
export const HeroImage = ({ url }) => {
  return (
    <>
      <Img alt="" height="734" src={url} width="1024" />
    </>
  );
};

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
