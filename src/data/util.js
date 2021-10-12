// Transfer(indexed address from, indexed address to, uint256 value)
const erc20TopicIdForTransfer =
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

function getSqlBytesForHexadecimalString(input) {
  return '\\x' + input.substring(2);
}

module.exports = {
  // constants
  erc20TopicIdForTransfer,

  // functions
  getSqlBytesForHexadecimalString,
};
