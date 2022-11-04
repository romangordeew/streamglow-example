import usePhantomWallet from "../hooks/usePhantomWallet";
import { useState } from "react";
import createStream from "../helpers/createStream";
import useWallet from "../hooks/useWallet";

function CreateStreamForm() {
  const [ , , , connected, publicKey, provider ] = usePhantomWallet();
  const [ name, setName ] = useState();
  const [ recipient, setRecipient ] = useState("CckwCo18YKNHiuE74tJj52dvsTBGzYeKn8icoaP2DD2R");
  const [ period, setPeriod ] = useState();
  const [ tx, setTx ] = useState();
  const wallet = useWallet(publicKey, provider);

  function handleEditField(stateModifierFunction) {
    return function ({target: {value}}) {
      stateModifierFunction(value);
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    createStream(wallet, name, recipient, period)
      .then(({tx}) => setTx(tx));
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <h3>Create your StreamFlow stream</h3>
        <input type="text" placeholder="Stream name" value={name} onChange={handleEditField(setName)}/>
        <input type="text" placeholder="Recepient address" value={recipient} onChange={handleEditField(setRecipient)}/>
        <input type="number" placeholder="Period in seconds" value={period} onChange={handleEditField(setPeriod)}/>

        <input type="submit" value="Create stream"/>

        {tx && <p>New stream is created, tx: {tx}</p>}
      </form>
    );
  }

  return (
    <div>
      {connected && renderForm()}
    </div>
  );
}

export default CreateStreamForm;
