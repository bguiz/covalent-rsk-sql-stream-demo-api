const express = require('express');

const latestTxRouteHandler = require('./latest-tx-handler.js');
const latestErc20TransferRouteHandler = require('./latest-erc20-transfer-handler.js');

const router = express.Router();

router.get('/latest/tx', latestTxRouteHandler);

router.get('/latest/erc20-transfer/:symbol', latestErc20TransferRouteHandler);

module.exports = router;
