import resetCss from "modern-css-reset?raw";
import { createGlobalStyle } from "styled-components";

import { Color } from "./variables";

export const GlobalStyle = createGlobalStyle`
 ${resetCss}

  body {
    color: ${Color.mono[900]};
    background: ${Color.mono[100]};
    font-family: sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul, ol {
    padding: 0;
    list-style: none;
    margin: 0;
  }

  @font-face {
    font-family: "Senobi-Gothic";
    font-weight: normal;
    font-display: block;
    src: url("/assets/fonts/MODI_Senobi-Gothic_2017_0702/Senobi-Gothic-Regular.ttf") format("truetype");
  }

  @font-face {
    font-family: "Senobi-Gothic";
    font-weight: bold;
    font-display: block;
    src: url("/assets/fonts/MODI_Senobi-Gothic_2017_0702/Senobi-Gothic-Bold.ttf") format("truetype");
  }
`;
