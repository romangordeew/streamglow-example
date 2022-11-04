import { PublicKey } from "@solana/web3.js";

const EMPTY_ARRAY = [];

const DEFAULT_STATE = {
  autoConnect: false,
  connecting: false,
  connected: false,
  disconnecting: false,
  select(_name) {
    console.error(constructMissingProviderErrorMessage("get", "select"));
  },
  connect() {
    return Promise.reject(console.error(constructMissingProviderErrorMessage("get", "connect")));
  },
  disconnect() {
    return Promise.reject(console.error(constructMissingProviderErrorMessage("get", "disconnect")));
  },
  sendTransaction(
    _transaction,
    _connection,
    _options
  ) {
    return Promise.reject(console.error(constructMissingProviderErrorMessage("get", "sendTransaction")));
  },
  signTransaction(_transaction) {
    return Promise.reject(console.error(constructMissingProviderErrorMessage("get", "signTransaction")));
  },
  signAllTransactions(_transaction) {
    return Promise.reject(console.error(constructMissingProviderErrorMessage("get", "signAllTransactions")));
  },
  signMessage(_message) {
    return Promise.reject(console.error(constructMissingProviderErrorMessage("get", "signMessage")));
  }
};
Object.defineProperty(DEFAULT_STATE, "wallets", {
  get() {
    console.error(constructMissingProviderErrorMessage("read", "wallets"));
    return EMPTY_ARRAY;
  },
});
Object.defineProperty(DEFAULT_STATE, "wallet", {
  get() {
    console.error(constructMissingProviderErrorMessage("read", "wallet"));
    return null;
  },
});

function constructMissingProviderErrorMessage(action, valueName) {
  return (
    "You have tried to " +
    ` ${action} "${valueName}"` +
    " on a WalletContext without providing one." +
    " Make sure to render a WalletProvider" +
    " as an ancestor of the component that uses " +
    "WalletContext"
  );
}

function createWalletState(publicKey, provider) {
  return {...DEFAULT_STATE, publicKey, ...provider};
}

export default function useWallet(publicKey, provider) {
  const pubKey = publicKey ? new PublicKey(publicKey) : publicKey;
  return createWalletState(pubKey, provider);
}
