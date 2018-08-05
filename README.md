# Syncano Socket for getting address data based on norwegian postcodes

[![Syncano Socket](https://img.shields.io/badge/syncano-socket-blue.svg)](https://syncano.io)
[![CircleCI branch](https://img.shields.io/circleci/project/github/eyedea-io/syncano-socket-norwegian-postcode/master.svg)](https://circleci.com/gh/eyedea-io/syncano-socket-norwegian-postcode/tree/master)
[![Codecov branch](https://img.shields.io/codecov/c/github/eyedea-io/syncano-socket-norwegian-postcode/master.svg)](https://codecov.io/gh/eyedea-io/syncano-socket-simple-norwegian-postcode)
[![npm](https://img.shields.io/npm/dw/@eyedea-sockets/norwegian-postcode.svg)](https://www.npmjs.com/package/@eyedea-sockets/norwegian-postcode)
![license](https://img.shields.io/github/license/eyedea-io/syncano-socket-norwegian-postcode.svg)

Main Socket features:

* **norwegian-postcode/search** — search for data for given postcode

## Getting Started

Install package in your project:

```sh
cd my_project
npm install @syncano/cli --save-dev
npm install @eyedea-sockets/norwegian-postcode --save
npx s deploy
```

Use it:

```js
import Syncano from '@syncano/client'

const s = new Syncano(<instaneName>)

const params = {
  postCode: '0161'
}
const sendStatus = await s.post('norwegian-postcode/search', params)
```

## Endpoints

### norwegian-postcode/search

#### Input:

|Parameter     | Type | Required  | Example          |
|--------------|------|-----------|------------------|
|postCode      |string|       Yes | `0161`           |

#### Outputs:

**success** - **Operation Successful**

- Code: 200
- Mimetype: application/json

|Parameter     | Type | Required  | Example          |
|--------------|------|-----------|------------------|
|city          |string|       Yes | `Mo I Rana`      |
|municipality  |string|       Yes | `Rana`           |
|county        |string|       Yes | `Nordland`       |
|category      |string|       Yes | `G`              |

**fail** - **Operation failed**

- Code: 400
- Mimetype: application/json

| Parameter | Type   | Description            | Example              |
|-----------|--------|------------------------|----------------------|
| message   | string | Invitation failed      | `Internal error.`    |
