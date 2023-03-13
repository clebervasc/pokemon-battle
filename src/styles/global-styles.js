import { createGlobalStyle } from 'styled-components';
import bg from '../images/bg-bpdy.png';

export const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #e6e6e6;
  height: auto;
  font-family: 'Roboto', sans-serif;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  font-size: 16px;

  @media only screen and (max-width: 93.75rem) {
    body {
      font-size: 14px;
      width: 500px;
    }
  }
}

.container {
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.container h1 {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #fff;
}

.separate {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.125rem;

  @media (max-width: 48rem) {
    height: 11.25rem;
    flex-direction: column;
    padding: 0.625rem;
  }
}
`;
