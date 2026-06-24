import { useState } from "react";
import "./App.css";

function App() {
  const [binary, setBinary] = useState("");
  // useState preserves the value across component re-renders
  // in this case, binary is the value while setBinary is a function to change the value
  const [decimal, setDecimal] = useState("");
  const [toggle, setToggle] = useState("Bin2Dec");

  function handleToggle() {
    if (toggle === "Bin2Dec") {
      setToggle("Dec2Bin");
    } else {
      setToggle("Bin2Dec");
    }

    setBinary("");
    setDecimal("");
  }

  function handleConvert(value) {
    if (value === "") {
      setDecimal("");
      return;
    }

    if (toggle === "Bin2Dec") {
      if (!/^[01]+$/.test(value)) {
        setDecimal("Enter only 0s and 1s");
        return;
      }

      // isolate each bit
      // each bit can be isolated by going through it and modding by 10
      // sum += bit * 2^bit_location
      //       1 or 0 * 2^n

      let num = Number(value);
      let sum = 0;
      let bit_place = 0;

      while (num !== 0) {
        let curr_bit = num % 10;
        num = (num - curr_bit) / 10;
        sum += curr_bit * (2 ** bit_place);

        bit_place += 1;
      }

      setDecimal(sum);
    } else {
      if (!/^[0-9]+$/.test(value)) {
        setDecimal("Enter only decimal numbers");
        return;
      }

      let num = Number(value);
      let binaryResult = "";

      if (num === 0) {
        setDecimal("0");
        return;
      }

      while (num > 0) {
        let remainder = num % 2;
        binaryResult = remainder + binaryResult;
        num = Math.floor(num / 2);
      }

      setDecimal(binaryResult);
    }
  }

  function handleClear() {
    setBinary("");
    setDecimal("");
  }

  return (
    <main className="app">
      <section className="card">
        <h1>{toggle}</h1>
        <p>
          {toggle === "Bin2Dec"
            ? "Convert binary numbers into decimal numbers."
            : "Convert decimal numbers into binary numbers."}
        </p>

        <input
          type="text"
          value={binary}
          onChange={(e) => {
            const value = e.target.value;

            setBinary(value);

            handleConvert(value);
          }}
          placeholder={toggle === "Bin2Dec" ? "Example: 1010" : "Example: 10"}
        />

        <div className="buttons">
          <button onClick={handleToggle}>Toggle</button>
          <button onClick={handleClear}>Clear</button>
        </div>

        <h2>Result: {decimal}</h2>
      </section>
    </main>
  );
}

export default App;