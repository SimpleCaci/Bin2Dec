import { useState } from "react";
import "./App.css";

function App() {
  const [binary, setBinary] = useState("");
  // useState preserves the value across componet re-renders
  // in this case, binary is the value while setBinary is a function to change the value
  const [decimal, setDecimal] = useState("");

  function handleConvert() {
    if (!/^[01]+$/.test(binary)) {
      setDecimal("Enter only 0s and 1s");
      return;
    }

    setDecimal(parseInt(binary, 2));
  }

  function handleClear() {
    setBinary("");
    setDecimal("");
  }

  return (
    <main className="app">
      <section className="card">
        <h1>Bin2Dec</h1>
        <p>Convert binary numbers into decimal numbers.</p>

        <input
          type="text"
          value={binary}
          onChange={(e) => {
            setBinary(e.target.value);
            handleConvert();
            }
          }
          placeholder="Example: 1010"
        />

        <div className="buttons">
          <button onClick={handleConvert}>Convert</button>
          <button onClick={handleClear}>Clear</button>
        </div>

        <h2>Result: {decimal}</h2>
      </section>
    </main>
  );
}

export default App;