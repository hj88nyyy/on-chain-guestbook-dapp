// On-chain guestbook contract config.
// Replace GUESTBOOK_ADDRESS with your deployed contract address on Sepolia.
export const GUESTBOOK_ADDRESS = "0x0000000000000000000000000000000000000000" as const

// ABI matching the expected guestbook contract interface:
// - sign(string message)
// - getEntries() returns Entry[] { address author; string message; uint256 timestamp; }
export const GUESTBOOK_ABI = [
  {
    type: "function",
    name: "sign",
    stateMutability: "nonpayable",
    inputs: [{ name: "message", type: "string" }],
    outputs: [],
  },
  {
    type: "function",
    name: "getEntries",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "author", type: "address" },
          { name: "message", type: "string" },
          { name: "timestamp", type: "uint256" },
        ],
      },
    ],
  },
] as const

// Shape of a single guestbook entry returned from getEntries().
export type GuestbookEntry = {
  author: `0x${string}`
  message: string
  timestamp: bigint
}
