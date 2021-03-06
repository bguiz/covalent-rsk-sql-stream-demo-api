const dbPool = require('../db-pool.js');
const erc20BySymbolMap = require('../data/erc20-tokens.js');
const {
  erc20TopicIdForTransfer,
  getSqlBytesForHexadecimalString,
} = require('../data/util.js');

function latestErc20TransferRouteHandler(req, res) {
  const symbol = req.params.symbol;
  const tokenData = erc20BySymbolMap.get(req.params.symbol);
  if (!tokenData) {
    return res.status(404).json({ error: 'unknown erc20', details: symbol });
  }
  const { address, decimals } = tokenData;
  const sqlStatement =
    `SELECT
      e.block_signed_at,
      e.block_height,
      '0x' || encode(e.tx_hash, 'hex') AS tx_hash,
      '0x' || encode(extract_address(e.topics[2]), 'hex') AS from_address,
      '0x' || encode(extract_address(e.topics[3]), 'hex') AS to_address,
      (cast(abi_field(e.data, 0) as numeric) / (10^${decimals})) AS amount
    FROM chain_rsk_mainnet.block_log_events e
    WHERE e.topics @> ARRAY[$1::bytea]
      AND e.topics[1] = $1
      AND e.sender = $2
    ORDER BY e.block_signed_at DESC
    LIMIT 1;`;
  console.log(sqlStatement);
  const sqlQuery = {
    text: sqlStatement,
    values: [
      getSqlBytesForHexadecimalString(erc20TopicIdForTransfer),
      getSqlBytesForHexadecimalString(address),
    ],
  };
  console.log(sqlQuery.values);
  dbPool.query(sqlQuery, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
}

module.exports = latestErc20TransferRouteHandler;
