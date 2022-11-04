import getAllStreams from "../helpers/getAllStreams";
import { useEffect, useState } from "react";
import usePhantomWallet from "../hooks/usePhantomWallet";
import useWallet from "../hooks/useWallet";

function StreamList() {
  const [ streams, setStreams ] = useState([]);
  const [ , , , connected, publicKey, provider ] = usePhantomWallet();
  const wallet = useWallet(publicKey, provider);

  function getStreamList() {
    if (connected) {
      getAllStreams(wallet)
        .then(setStreams);
    }
  }

  useEffect(getStreamList, [ connected ]);

  return (
    <div>
      stream list is here
    </div>
  );
}

export default StreamList;
