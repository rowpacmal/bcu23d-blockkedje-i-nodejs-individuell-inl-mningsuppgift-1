import { describe, expect, it } from 'vitest';
import { mineBlock } from '../controllers/blockchainController.mjs';
import ErrorResponse from '../utils/ErrorResponse.mjs';

const req = { body: { data: 'data' } };
const res = {
  status: (statusCode) => {
    return { status: statusCode, json: (dataJSON) => dataJSON };
  },
};
const next = (input) => input;

describe('Test mineBlock() function', () => {
  it('Should take in data without throwing an error', () => {
    const testFunc = mineBlock(req, res, next);

    expect(testFunc).not.toThrow();
  });
});
