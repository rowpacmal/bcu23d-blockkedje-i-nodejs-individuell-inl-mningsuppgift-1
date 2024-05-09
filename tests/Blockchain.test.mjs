import { describe, expect, it, beforeEach } from 'vitest';
import Blockchain from '../models/Blockchain.mjs';

describe('Blockchain', () => {
  describe('Has properties...', () => {
    it('should have the properties name, chain, memberNodes and nodeUrl', () => {
      const properties = ['name', 'chain', 'memberNodes', 'nodeUrl'];

      properties.forEach((p) => {
        expect(Blockchain.createChain()).toHaveProperty(p);
      });
    });
  });
});
