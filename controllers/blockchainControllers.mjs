const getBlockchain = (req, res, next) => {
  res.json({ msg: 'get blockchain' });
};

const getLatestBlock = (req, res, next) => {
  res.json({ msg: 'get the latest' });
};

const getBlockByIndex = (req, res, next) => {
  res.json({ msg: `get block by index ${req.params.index}` });
};

const mineBlock = (req, res, next) => {
  res.json({ msg: 'mine new block' });
};

export { getBlockchain, getLatestBlock, getBlockByIndex, mineBlock };
