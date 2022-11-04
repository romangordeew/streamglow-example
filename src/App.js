import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import CreateStreamForm from "./components/CreateStreamForm";
import StreamList from "./components/StreamList";

function App() {
  return (
    <div className="App">
      <ConnectWallet/>
      <CreateStreamForm/>
      <StreamList/>
    </div>
  );
}

export default App;
