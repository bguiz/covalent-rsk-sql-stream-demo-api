const express = require('express');

const dbPool = require('../db-pool.js');

const router = express.Router();

router.get('/latest-tx', function(req, res) {
  const sqlStatement =
    `SELECT date_trunc('day', txns.signed_at) AS txn_date
    , '0x' ||encode(txns.hash, 'hex') AS txn_hash
    , '0x' || encode(txns."from", 'hex') AS from_address
    , '0x' || encode(txns."to", 'hex') AS to_address
    FROM chain_rsk_mainnet.block_transactions txns
    ORDER BY txns.signed_at DESC
    LIMIT 1;`;
  dbPool.query(sqlStatement, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
});




module.exports = router;
