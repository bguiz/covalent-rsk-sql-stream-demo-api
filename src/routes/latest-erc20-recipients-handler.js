const dbPool = require('../db-pool.js');
const erc20BySymbolMap = require('../data/erc20-tokens.js');
const {
  erc20TopicIdForTransfer,
  getSqlBytesForHexadecimalString,
} = require('../data/util.js');

function latestErc20RecipientsRouteHandler(req, res) {
  const symbol = req.params.symbol;
  const startBlock = parseInt(req.query.startBlock, 10);
  const endBlock = parseInt(req.query.endBlock, 10);
  if (isNaN(startBlock) || startBlock < 1 ||
    isNaN(endBlock) || endBlock < 1 ||
    startBlock > endBlock) {
    return res.status(400).json({
      error: 'invalid startBlock, endBlock',
      details: [startBlock, endBlock],
    });
  }
  const tokenData = erc20BySymbolMap.get(req.params.symbol);
  if (!tokenData) {
    return res.status(404).json({ error: 'unknown erc20', details: symbol });
  }
  const { address } = tokenData;
  const sqlStatement =
    `SELECT
      '0x' || encode(extract_address(e.topics[3]), 'hex') AS to_address
    FROM chain_rsk_mainnet.block_log_events e
    WHERE
      e.block_height >= $3
      AND e.block_height <= $4
      AND e.topics @> ARRAY[$1::bytea]
      AND e.topics[1] = $1
      AND e.sender = $2
    GROUP BY to_address;`;
  console.log(sqlStatement);
  const sqlQuery = {
    text: sqlStatement,
    values: [
      getSqlBytesForHexadecimalString(erc20TopicIdForTransfer),
      getSqlBytesForHexadecimalString(address),
      startBlock,
      endBlock,
    ],
  };
  console.log(sqlQuery.values);
  dbPool.query(sqlQuery, (error, results) => {
    if (error) {
      throw error;
    }
    const out = {
      addresses: results.rows.map((row) => (row.to_address)),
      count: results.rows.length,
    };
    res.status(200).json(out);
  });
}

module.exports = latestErc20RecipientsRouteHandler;
