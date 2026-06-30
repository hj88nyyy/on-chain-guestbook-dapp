import { createConfig, http } from "wagmi"
import { sepolia } from "wagmi/chains"
import { injected } from "wagmi/connectors"

// wagmi config: Sepolia testnet only, injected (MetaMask) connector, http transport.
export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: true,
})

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig
  }
}
