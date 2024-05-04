import { blockchain } from '../startup.mjs';

import ServerResponse from '../utils/ServerResponse.mjs';
import ErrorResponse from '../utils/ErrorResponse.mjs';
import FileHandler from '../utils/FileHandler.mjs';

const getMemberNodes = (req, res, next) => {
  res
    .status(200)
    .json(new ServerResponse({ status: 200, data: blockchain.memberNodes }));
};

const createNode = (req, res, next) => {
  const node = req.body.nodeUrl;

  if (
    !(
      blockchain.memberNodes.indexOf(node) === -1 && blockchain.nodeUrl !== node
    )
  ) {
    return next(
      new ErrorResponse(
        `Node ${node} is already registered on the ${blockchain.name} chain`,
        400
      )
    );
  }

  blockchain.memberNodes.push(node);
  syncMembers(node, next);

  new FileHandler('data', `blockchain-${process.argv[2]}.json`).write(
    blockchain
  );

  res.status(201).json(
    new ServerResponse({
      status: 201,
      data: {
        message: `Node ${node} has been registered on the ${blockchain.name} chain`,
      },
    })
  );
};

const syncMembers = (url, next) => {
  const members = [...blockchain.memberNodes, blockchain.nodeUrl];

  try {
    members.forEach(async (member) => {
      await fetch(`${url}/api/v1/members/register-node`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodeUrl: member }),
      });
    });
  } catch (error) {
    throw error;
  }
};

export { getMemberNodes, createNode };
