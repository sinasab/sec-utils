import React from "react";
import DZ from "react-dropzone";
import styled from "styled-components";

import {
  decrypt,
  downloadAsFile,
  encrypt,
  estimateDecryptionProgress,
  estimateEncryptionProgress
} from "../util/encryption.js";

export default class Encrypter extends React.Component<null, null> {
  state = {
    clearTexts: [],
    decryptionProgress: null,
    encryptedHexes: [],
    encryptionProgress: null,
    passphrase: "a dummy passphrase"
  };

  _onEncryptFileDrop = async (acceptedFiles, rejectedFiles) => {
    const { passphrase } = this.state;
    if (passphrase === "") {
      return console.log(
        "Encryption/decryption not allowed with empty passphrase!"
      );
    }
    this.setState({ clearTexts: [], encryptedHexes: [] });
    const fileNames = acceptedFiles.map(file => file.name).reverse();
    const reader = new FileReader();
    reader.onload = async e => {
      const fileText = e.target.result;
      this.setState(oldState => ({
        clearTexts: oldState.clearTexts.concat(fileText)
      }));
      const result = await encrypt(
        fileText,
        passphrase,
        this._encryptProgressHandler
      );
      this.setState(oldState => ({
        encryptedHexes: oldState.encryptedHexes.concat(result),
        encryptionProgress: null
      }));
      downloadAsFile(result, `e_${fileNames.pop()}`);
    };
    return acceptedFiles.forEach(file => reader.readAsArrayBuffer(file));
  };

  _onDecryptFileDrop = async (acceptedFiles, rejectedFiles) => {
    const { passphrase } = this.state;
    if (passphrase === "") {
      return console.log(
        "Encryption/decryption not allowed with empty passphrase!"
      );
    }
    this.setState({ clearTexts: [], encryptedHexes: [] });
    const fileNames = acceptedFiles.map(file => file.name).reverse();
    const reader = new FileReader();
    reader.onload = async e => {
      const fileText = e.target.result;
      this.setState(oldState => ({
        encryptedHexes: oldState.encryptedHexes.concat(fileText)
      }));
      const result = await decrypt(
        fileText,
        passphrase,
        this._decryptProgressHandler
      );
      this.setState(oldState => ({
        clearTexts: oldState.clearTexts.concat(result),
        decryptionProgress: null
      }));
      downloadAsFile(result, `d_${fileNames.pop()}`);
    };
    return acceptedFiles.forEach(file => reader.readAsArrayBuffer(file));
  };

  _decryptProgressHandler = progressObj => {
    const progress = estimateDecryptionProgress(progressObj);
    console.log(this.state);
    return this.setState({ decryptionProgress: progress });
  };

  _encryptProgressHandler = progressObj => {
    const progress = estimateEncryptionProgress(progressObj);
    return this.setState({ encryptionProgress: progress });
  };

  _renderDropzones() {
    return (
      <DropzonesContainer>
        <Dropzone onDrop={this._onEncryptFileDrop}>
          Encrypt
          {Encrypter._renderDropzoneProgress(this.state.encryptionProgress)}
        </Dropzone>
        <Dropzone onDrop={this._onDecryptFileDrop}>
          Decrypt
          {Encrypter._renderDropzoneProgress(this.state.decryptionProgress)}
        </Dropzone>
      </DropzonesContainer>
    );
  }

  static _renderDropzoneProgress(progress) {
    return <DropzoneProgress style={{ width: `${progress * 100}%` }} />;
  }

  _renderPassphrase() {
    return (
      <PassphraseTextarea
        onChange={e => {
          this.setState({ passphrase: e.target.value });
        }}
        placeholder="your encryption key"
        value={this.state.passphrase}
        wrap="off"
      />
    );
  }

  render() {
    window.t = this;
    return (
      <Container>
        <h2>File Encrypter</h2>
        {this._renderPassphrase()}
        {this._renderDropzones()}
      </Container>
    );
  }
}

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 10px;
`;
const Dropzone = styled(DZ)`
  border: 1px dashed black;
  border-radius: 5px;
  cursor: pointer;
  flex: 1 1 20%;
  font-size: 15;
  margin: 10px;
  padding: 40px;
  position: relative;
`;
const DropzonesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 10px;
  width: 70%;
`;
const DropzoneProgress = styled.div`
  background: lime;
  height: 100%;
  left: 0px;
  position: absolute;
  top: 0px;
  width: 0%;
  z-index: -1;
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
