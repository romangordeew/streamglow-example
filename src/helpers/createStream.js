import { BN, getBN } from "@streamflow/stream";
import createStreamClient from "./createStreamClient";

async function createStream(wallet, name, recipient, period) {
  const streamClient = createStreamClient();
  const date = new Date();

  const createStreamParams = {
    sender: wallet, // Wallet/Keypair signing the transaction, creating and sending the stream.
    recipient, // Solana recipient address.
    mint: "So11111111111111111111111111111111111111112", // SPL Token mint.
    start: date.getTime() / 1000 + 30, // Timestamp (in seconds) when the stream/token vesting starts.
    depositedAmount: getBN(1, 7), // depositing 1 tokens with 9 decimals mint.
    period, // Time step (period) in seconds per which the unlocking occurs.
    cliffAmount: new BN(10), // Amount unlocked at the "cliff" timestamp.
    amountPerPeriod: getBN(1, 5), // Release rate: how many tokens are unlocked per each period.
    name, // The stream name or subject.
    canTopup: true, // setting to FALSE will effectively create a vesting contract.
    cancelableBySender: true, // Whether or not sender can cancel the stream.
    cancelableByRecipient: true, // Whether or not recipient can cancel the stream.
    transferableBySender: true, // Whether or not sender can transfer the stream.
    transferableByRecipient: true, // Whether or not recipient can transfer the stream.
    automaticWithdrawal: true, // Whether or not a 3rd party (e.g. cron job, "cranker") can initiate a token withdraw/transfer.
    withdrawalFrequency: 0, // Relevant when automatic withdrawal is enabled. If greater than 0 our withdrawor will take care of withdrawals. If equal to 0 our withdrawor will skip, but everyone else can initiate withdrawals.
    partner: null, //  (optional) Partner's wallet address (string | null).
  };

  try {
    const {ixs, tx, metadata} = await streamClient.create(createStreamParams);
    console.log({ixs, tx, metadata});

    return {ixs, tx, metadata};
  } catch (exception) {
    console.error(exception);
  }
}

export default createStream;
