const express = require('express');

const latestTxRouteHandler = require('./latest-tx-handler.js');
const latestErc20TransferRouteHandler = require('./latest-erc20-transfer-handler.js');
const latestErc20RecipientsRouteHandler = require('./latest-erc20-recipients-handler.js');

const router = express.Router();

router.get('/latest/tx', latestTxRouteHandler);

router.get('/latest/erc20-transfer/:symbol', latestErc20TransferRouteHandler);

router.get('/latest/erc20-recipients/:symbol', latestErc20RecipientsRouteHandler);

module.exports = router;
