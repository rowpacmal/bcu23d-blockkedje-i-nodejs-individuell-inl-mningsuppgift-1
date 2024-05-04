import crypto from 'crypto';

const createHash = (string) => {
  return crypto.createHash('sha256').update(string).digest('hex');
};

export { createHash };
