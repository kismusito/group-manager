import { createGlobalStyle } from "styled-components";
import "typeface-roboto";

export const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Roboto";
}
`;
