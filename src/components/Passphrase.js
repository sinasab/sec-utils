import React from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { defaultGeneratorOptions, generate } from "../util/passphraseGenerator";

export default class Passphrase extends React.Component {
  state = {
    generatorOptions: defaultGeneratorOptions,
    passphrase: generate(defaultGeneratorOptions)
  };

  _makeNewPassphrase = () => {
    this.setState({ passphrase: generate(this.state.generatorOptions) });
  };

  _renderButtons() {
    return (
      <ButtonsContainer>
        <CopyToClipboard text={this.state.passphrase}>
          <PassphraseButton type="button">copy to clipboard</PassphraseButton>
        </CopyToClipboard>
        <PassphraseButton onClick={this._makeNewPassphrase} type="button">
          generate new passphrase
        </PassphraseButton>
      </ButtonsContainer>
    );
  }

  _renderCheckboxOptions() {
    return [
      { optionName: "includeNumbers", label: "nums" },
      { optionName: "includeSymbols", label: "symbols" },
      { optionName: "randomlyCapitalize", label: "caps" }
    ].map(({ optionName, label }) => (
      <label key={`${optionName}_${this.state[optionName]}`}>
        {label}
        <input
          checked={this.state[optionName]}
          id={`${optionName}_checkbox`}
          onChange={() =>
            this.setState(oldState => ({
              generatorOptions: {
                ...oldState.generatorOptions,
                [optionName]: !oldState.generatorOptions[optionName]
              }
            }))
          }
          type="checkbox"
        />
      </label>
    ));
  }

  _renderNumWordsInput() {
    return (
      <label>
        num words:
        <NumWordsInput
          max="1000"
          min="1"
          onChange={e => {
            const newVal = e.target.value;
            this.setState(oldState => ({
              generatorOptions: {
                ...oldState.generatorOptions,
                numWords: newVal
              }
            }));
          }}
          step="1"
          type="number"
          value={this.state.generatorOptions.numWords}
        />
      </label>
    );
  }

  _renderSeparatorInput() {
    return (
      <label>
        separator
        <SeparatorInput
          onChange={e => {
            const newVal = e.target.value;
            this.setState(oldState => ({
              generatorOptions: {
                ...oldState.generatorOptions,
                separator: newVal
              }
            }));
          }}
          type="text"
          value={this.state.generatorOptions.separator}
        />
      </label>
    );
  }

  _renderOptions() {
    return (
      <OptionsContainer id="render_options_container">
        {this._renderCheckboxOptions()}
        {this._renderNumWordsInput()}
        {this._renderSeparatorInput()}
      </OptionsContainer>
    );
  }

  _renderPassphrase() {
    return (
      <PassphraseTextarea
        onChange={e => {
          this.setState({ passphrase: e.target.value });
        }}
        placeholder="your passphrase"
        value={this.state.passphrase}
        wrap="off"
      />
    );
  }
  render() {
    return (
      <Container>
        <h2>Passphrase Generator</h2>
        {this._renderPassphrase()}
        {this._renderButtons()}
        {this._renderOptions()}
      </Container>
    );
  }
}

const SeparatorInput = styled.input`
  margin-left: 5px;
  width: 4em;
`;
const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-evenly;
  width: 70%;
  flex-wrap: wrap;
`;
const PassphraseButton = styled.button`
  border-radius: 5px;
  flex: 1 1 20%;
  font-size: 15px;
  margin: 10px;
  padding: 20px 5px;
  outline: none;
`;
const NumWordsInput = styled.input`
  margin-left: 5px;
  width: 3em;
`;
const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 10px;
`;
const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 10px;
  width: 70%;
`;
const PassphraseTextarea = styled.textarea`
  border: none;
  font-size: 20px;
  height: 25px;
  outline: none;
  resize: none;
  text-align: center;
  width: 70%;
`;
