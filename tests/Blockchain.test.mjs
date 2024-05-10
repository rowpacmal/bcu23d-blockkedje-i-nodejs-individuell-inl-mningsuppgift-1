import { describe, expect, it, beforeEach } from 'vitest';
import Blockchain from '../models/Blockchain.mjs';
import Block from '../models/Block.mjs';

describe('Blockchain', () => {
  describe('Properties', () => {
    describe('Has properties...', () => {
      it('should have the properties name, chain, memberNodes and nodeUrl', () => {
        const properties = ['name', 'chain', 'memberNodes', 'nodeUrl'];

        properties.forEach((p) => {
          expect(Blockchain.createChain({})).toHaveProperty(p);
        });
      });
    });

    describe('Has values...', () => {
      it('name and nodeUrl should have a value of string', () => {
        const blockchain = Blockchain.createChain({});
        const properties = ['name', 'nodeUrl'];

        properties.forEach((p) => {
          expect(blockchain[p]).toBeTypeOf('string');
        });
      });

      it('chain and memberNodes should have a value of array', () => {
        const blockchain = Blockchain.createChain({});
        const properties = ['chain', 'memberNodes'];

        properties.forEach((p) => {
          expect(blockchain[p] instanceof Array).toBeTruthy();
        });
      });
    });
  });

  describe('Methods', () => {
    describe('Has methods...', () => {
      it('should have the methods createBlock, getLastBlock and proofOfWork', () => {
        const methods = ['createBlock', 'getLastBlock', 'proofOfWork'];

        methods.forEach((m) => {
          expect(Blockchain.createChain({})).toHaveProperty(m);
        });
      });
    });

    describe('Has values...', () => {
      it('all should have the value of function', () => {
        const blockchain = Blockchain.createChain({});
        const methods = ['createBlock', 'getLastBlock', 'proofOfWork'];

        methods.forEach((m) => {
          expect(blockchain[m]).toBeTypeOf('function');
        });
      });
    });

    describe('createBlock() function', () => {
      it('should return an instance of Block', () => {
        const blockchain = Blockchain.createChain({});

        expect(blockchain.createBlock({}) instanceof Block).toBeTruthy();
      });
    });
  });

  describe('Static Methods', () => {
    describe('Has properties...', () => {
      it('should have the static methods createChain, createGenesisBlock, hashBlock, adjustDifficulty and validateChain', () => {
        const blockchainProperties = Object.getOwnPropertyNames(Blockchain);
        const staticMethods = [
          'createChain',
          'createGenesisBlock',
          'hashBlock',
          'adjustDifficulty',
          'validateChain',
        ];

        staticMethods.forEach((m) => {
          expect(blockchainProperties.includes(m)).toBeTruthy();
        });
      });
    });

    describe('Has values...', () => {
      it('all should have the value of function', () => {
        const staticMethods = [
          'createChain',
          'createGenesisBlock',
          'hashBlock',
          'adjustDifficulty',
          'validateChain',
        ];

        staticMethods.forEach((m) => {
          expect(Blockchain[m]).toBeTypeOf('function');
        });
      });
    });
  });
});
