import React from "react";
import styled, { keyframes } from "styled-components";

import logo from "./logo.svg";
import Passphrase from "../Passphrase";
import Encrypter from "../Encrypter";

export default class App extends React.Component {
  render() {
    return (
      <MainContainer>
        <MainHeader>
          <RotatingLogo src={logo} alt="logo" />
          <MainTitle>sec-utils</MainTitle>
        </MainHeader>
        <Passphrase />
        <Encrypter />
      </MainContainer>
    );
  }
}

const MainContainer = styled.div`
  text-align: center;
`;
const MainHeader = styled.header`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;
const imageKeyframe = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const RotatingLogo = styled.img`
  animation: ${imageKeyframe} infinite 20s linear;
  height: 80px;
`;
const MainTitle = styled.h1`
  font-size: 1.5em;
`;
