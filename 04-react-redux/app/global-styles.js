import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    text-align: center;
    background: #ddd;
  }

  body.fontLoaded {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    min-height: 100%;
    margin: 0 auto;
    width: 1000px;
    text-align: center;
    padding-top: 50px;
    position: relative;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  h1 {
    margin-bottom: 40px !important;
    color: #333;
  }

  h2 {

  }

.typeahead input {
  width: 400px;
  height: 30px;
  padding: 10px;
  font-size: 1.3em;
}

ul {
  padding: 0;
}

li {
  list-style: none;
  font-size: 1.2em;
  padding: 5px;
}

li a {
  text-decoration: none;
  color: #777;
}

li a:hover {
  color: #333;
}

`;
