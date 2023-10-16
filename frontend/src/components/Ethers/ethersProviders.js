import React from 'react';
import { usePublicClient } from 'wagmi';
import { providers } from 'ethers';
// import { HttpTransport } from 'viem';

export function publicClientToProvider(publicClient) {
  const { chain, transport } = publicClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type === 'fallback') {
    return new providers.FallbackProvider(
      transport.transports.map(({ value }) => new providers.JsonRpcProvider(value?.url, network))
    );
  }
  return new providers.JsonRpcProvider(transport.url, network);
}

export function useEthersProvider({ chainId } = {}) {
  const publicClient = usePublicClient({ chainId });
  return React.useMemo(() => publicClientToProvider(publicClient), [publicClient]);
}
