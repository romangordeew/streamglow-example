import usePhantomWallet from "../hooks/usePhantomWallet";

function ConnectWallet() {
  const [
    isPhantomWalletAvailable, connect,
    disconnect, connected, publicKey
  ] = usePhantomWallet();

  return (
    <div>
      {!isPhantomWalletAvailable && <p>Phantom wallet is not detected, please install Phantom Wallet</p>}
      {connected
        ? <button onClick={disconnect}>Disconnect</button>
        : <button onClick={connect}>Connect</button>}

      {connected && <div>Your public key is: {publicKey}</div>}
    </div>
  );
}

export default ConnectWallet;
