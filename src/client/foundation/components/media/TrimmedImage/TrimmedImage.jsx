import styled from "styled-components";

export const IconImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`

export const ThmImgCont = styled.div`
  position: relative;
  &:before {
    content: "";
    display: block;
    padding-top: 56.25%;
    width: 400px;
  }
`


export const ThmImg = styled.img`
  max-height: 100%;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`
