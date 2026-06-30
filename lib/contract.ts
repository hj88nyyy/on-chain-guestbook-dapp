// On-chain guestbook contract config.
// Replace GUESTBOOK_ADDRESS with your deployed contract address on Sepolia.
export const GUESTBOOK_ADDRESS = "0x47273d9fc359E1C617Db85a253A299f245D78F13" as const

// ABI matching the expected guestbook contract interface:
// - sign(string message)
// - getEntries() returns Entry[] { address author; string message; uint256 timestamp; }
export const GUESTBOOK_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "author",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "NewEntry",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "sign",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getEntries",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "author",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "message",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct Guestbook.Entry[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "total",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Shape of a single guestbook entry returned from getEntries().
export type GuestbookEntry = {
  author: `0x${string}`
  message: string
  timestamp: bigint
}
