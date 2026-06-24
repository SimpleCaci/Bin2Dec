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

    // isolate each bit 
    //  each bit can be isolated by going through it and modding my 10
    // sum += bit * 2^bit_location 
    //       1 or 0 * 2^n

    let num = binary;
    let curr_bit = 0;
    let sum = 0;
    let bit_place = 1;

    while (num != 0) {
      curr_bit = num % 10;
      num = (num - curr_bit) / 10;
      sum += curr_bit * (2 ** bit_place);

      bit_place += 1;
    }


    setDecimal(sum);
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
            // setBinary() seems to lag behind handleConvert() sometimes
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