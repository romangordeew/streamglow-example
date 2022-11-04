import createStreamClient from "./createStreamClient";

async function getAllStreams(wallet) {
  const streamClient = createStreamClient();

  try {
    return streamClient.get({wallet: wallet.publicKey});
  } catch (exception) {
    console.error(exception);
  }
}

export default getAllStreams;
