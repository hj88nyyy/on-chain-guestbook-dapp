// Shorten an Ethereum address: 0x1234...abcd
export function shortenAddress(address?: string) {
  if (!address) return ""
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// Format a unix timestamp (seconds, bigint) into a readable local string.
export function formatTimestamp(timestamp: bigint) {
  const ms = Number(timestamp) * 1000
  if (!ms) return ""
  return new Date(ms).toLocaleString()
}
