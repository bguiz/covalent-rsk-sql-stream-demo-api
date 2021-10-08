# covalent-rsk-sql-stream-demo-api

A demo API that establishes a connection to a Covalent database to fetch RSK data

What is this for?
[the #OneMillionsWallets hackathon](https://www.onemillionwallets.com/rsk)
by RSK + Covalent, featuring Money on Chain, Sovryn, Babelfish, Tropykus, and Transfero.

## How to use

```shell
cp .template.env .env
```

Edit to replace placeholder value for the postgres username and password

To start the server (normal mode):

```shell
npm run start
```

To hit the API endpoint already present:

```shell
curl http://localhost:3000/v1/latest-tx
```

```json
[
  {
    "txn_date": "2021-10-07T16:00:00.000Z",
    "txn_hash": "0x15679513d738d0ebdde3e8fff5f37551d1f5466a4fe933f4ff2dd0a0c8878b0f",
    "from_address": "0x986a2fca9eda0e06fbf7839b89bfc006ee2a23dd",
    "to_address": "0xefc78fc7d48b64958315949279ba181c2114abbd"
  }
]
```

## How to develop

To start the server (development mode):

```shell
npm run dev
```

This is the same as starting the server normally,
except that each time you save a file that `node` has loaded,
it'll restart the server with your latest changes.

Tips:

- Edit `src/routes/index.js` to add more API endpoints.
- If you are querying a specific smart contract,
  try out the ["Topic Calculator (SQL)"](https://www.covalenthq.com/docs/tools/topic-calculator-sql),
  which is an SQL codegen tool that can come in handy.
- If you are querying a specific smart contract,
  but you are not able to extract the expected information from it,
  it is likely that Covalent does not have its corresponding ABI.
  You need to [submit the ABI](https://covalenthq.typeform.com/to/SCarT0yg?utm_source=bguiz).

## Licence

GPL-3.0

## Author

[Brendan Graetz](http://bguiz.com/)
