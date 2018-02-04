# sec-utils
https://sinasabet81.github.io/sec-utils/.

## Motivation
I found myself frequently wanting to generate passphrases composed of plain english words with a variety of different options; I also wanted to see if it was possible to encrypt arbitrary files with these generated passwords in a web browser. Turns out, you can!

### Passphrase generator
- generates human-readable passphrase by randomly sampling from list of english words
- options for including numbers, symbols, caps, number of words, and separator
- copy to clipboard

### File Encrypter
- encrypt/decrypt arbitrary files using keybase's [triplesec](https://github.com/keybase/triplesec) scheme
  - entails AES for encryption, HMAC for authentication
  - more on triplesec scheme: https://keybase.io/triplesec

## Development
This project was bootstrapped with `create-react-app`; check the [user guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) (also [a copy in this repo](https://github.com/sinasabet81/sec-utils/blob/master/docs/create_react_app_user_guide.md)) for more info.

### Commands
- `yarn start`: spin up a test server with hot reloading at http://localhost:3000/
- `yarn build`: build into `./build` directory
- `yarn deploy`: build and deploy with `gh-pages`

### Notable packages
- [create-react-app](https://github.com/facebook/create-react-app) for boilerplate and config
- [triplesec](https://github.com/keybase/triplesec) for encryption
- [gh-pages](https://github.com/tschaub/gh-pages) for deployment to Github pages
