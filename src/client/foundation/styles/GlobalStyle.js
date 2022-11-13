import resetCss from "modern-css-reset?raw";
import { config, dom as fontawesomeDom } from "@fortawesome/fontawesome-svg-core";
import { createGlobalStyle } from "styled-components";

import { Color } from "./variables";

config.autoAddCss = false;

export const GlobalStyle = createGlobalStyle`
 ${resetCss}
 ${fontawesomeDom.css()}

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
    src: url("/assets/fonts/MODI_Senobi-Gothic_2017_0702/Senobi-Gothic-Regular.woff") format("woff");
  }

  @font-face {
    font-family: "Senobi-Gothic";
    font-weight: bold;
    font-display: block;
    src: url("/assets/fonts/MODI_Senobi-Gothic_2017_0702/Senobi-Gothic-Bold.woff") format("woff");
  }
`;
