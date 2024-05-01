export const getBlockchain = (req, res, next) => {
  res.status(200).json({ success: true, data: 'Get Blockchain' });
};

export const getBlockByIndex = (req, res, next) => {
  res.status(200).json({ success: true, data: 'Get Block by Index' });
};

export const getLatestBlock = (req, res, next) => {
  res.status(200).json({ success: true, data: 'Get Latest Block' });
};

export const mineBlock = (req, res, next) => {
  res.status(200).json({ success: true, data: 'Mine Block' });
};
