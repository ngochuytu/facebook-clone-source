import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FireBaseAuthContextProvider } from './Contexts/FireBaseAuthContext';
import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
  *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Helvetica, 'Segoe UI', sans-serif;
}

  html{
    scroll-behavior: smooth;
  }

  ul, li{
    list-style: none;
  }

  a{
    text-decoration: none;
    color: inherit;
    display: block;
  }

  img{
    display: block;
  }

  button{
    border: none;
    outline: none;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-y: scroll;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <FireBaseAuthContextProvider>
      <App />
      <GlobalStyle />
    </FireBaseAuthContextProvider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);
reportWebVitals();
