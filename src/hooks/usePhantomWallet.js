import { useEffect, useState } from "react";

function usePhantomWallet() {
  const [ connected, setConnected ] = useState(false);
  const [ publicKey, setPublicKey ] = useState();
  const [ provider, setProvider ] = useState();

  function isPhantomWalletAvailable() {
    return window?.solana?.isPhantom;
  }

  useEffect(() => {
    if (isPhantomWalletAvailable()) {
      setProvider(window.solana);
    }
  }, []);

  useEffect(() => {
    provider?.on("connect", (_publicKey) => {
      console.log(`connect event: ${_publicKey}`);
      setConnected(true);
      setPublicKey(_publicKey);
    });

    provider?.on("disconnect", () => {
      console.log("disconnect event");
      setConnected(false);
      setPublicKey(null);
    });

  }, [ provider ]);


  return [
    isPhantomWalletAvailable(),
    () => window?.solana?.connect({}),
    () => window?.solana?.disconnect({}),
    connected,
    publicKey?.toBase58(),
    provider
  ];
}

export default usePhantomWallet;
