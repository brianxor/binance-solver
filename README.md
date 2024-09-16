# binance-solver

A solver for the binance captcha.

## Description

Decided to open source this, the code is not great, this was also made a long time ago so it might not work anymore but it's still a good project to learn from.

> [!NOTE]
> Deobfuscator still works.

## Supported Modes

- Box

## Setup

1. `git clone https://github.com/brianxor/binance-solver.git`
2. `npm install`
3. `npm run start`

## Usage

Base URL: `http://127.0.0.1:5000/`

> [!TIP]
> You can configure the server port through .env file.

### Endpoints

- `/captcha/solve`

Method: `POST`

#### Request Body

| Parameter      | Type   | Description                                | Required |
|----------------|--------|--------------------------------------------|----------|
| `mode`         | string | Solving Mode           | Yes      |
| `bizId`        | string | Method Id    | Yes      |
| `captchaData`  | object | Captcha Data     | Yes      |

#### Captcha Data Object Properties Table
| Parameter       | Type   | Description                           | Required |
|-----------------|--------|---------------------------------------|----------|
| `sig`         | string | From `/getCaptcha` | Yes      |
| `salt`     | string | From `/getCaptcha`  | Yes      |
| `path2`     | string | From `/getCaptcha`     | Yes       |
| `ek`     | string | From `/getCaptcha`     | Yes       |
| `captchaType`     | string | From `/getCaptcha`     | Yes       |
| `tag`     | string | From `/getCaptcha`     | Yes       |

#### Request Body Example
```json
{
  "mode": "PAYLOAD",
  "bizId": "login",
  "captchaData": {
    "sig": "",
    "salt": "",
    "path2": "",
    "ek": "",
    "captchaType": "BOX",
    "tag": ""
  }
}
```