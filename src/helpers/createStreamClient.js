import { Cluster, StreamClient } from "@streamflow/stream";

export default function createStreamClient() {
  return new StreamClient(
    "https://api.devnet.solana.com",
    Cluster.Devnet,
    "confirmed",
    "HqDGZjaVRXJ9MGRQEw7qDc2rAr6iH1n1kAQdCZaCMfMZ"
  );
}
