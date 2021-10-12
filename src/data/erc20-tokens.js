const erc20BySymbolMap = new Map();

erc20BySymbolMap.set('RIF',
  { address: '0x2aCc95758f8b5F583470bA265Eb685a8f45fC9D5', decimals: 18 });
erc20BySymbolMap.set('DOC',
  { address: '0xE700691Da7B9851F2F35f8b8182C69C53ccad9DB', decimals: 18 });
erc20BySymbolMap.set('MOC',
  { address: '0x9aC7Fe28967b30e3a4E6E03286D715B42B453d10', decimals: 18 });
erc20BySymbolMap.set('XUSD',
  { address: '0xb5999795BE0eBb5BAb23144Aa5fD6a02d080299f', decimals: 18 });
erc20BySymbolMap.set('FISH',
  { address: '0xb5999795BE0eBb5BAb23144Aa5fD6a02d080299f', decimals: 18 });
erc20BySymbolMap.set('SOV',
  { address: '0xEfC78FC7D48B64958315949279bA181C2114abbD', decimals: 18 });
erc20BySymbolMap.set('BRZ',
  { address: '0xE355C280131dfaf18Bf1C3648aEE3c396Db6B5Fd', decimals: 4 });

module.exports = erc20BySymbolMap;
