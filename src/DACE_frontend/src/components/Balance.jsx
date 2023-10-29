import React, { useState } from "react";
import { DACE_backend } from "../../../declarations/DACE_backend";
import { Principal } from "@dfinity/principal";

function Balance() {
  const [inputValue, setInput] = useState("");
  const [balance, setBalance] = useState("");
  const [symbol, setSymbol] = useState("");

  async function handleClick() {
    if(inputValue === "")
      return;
    
    const principal = Principal.fromText(inputValue);
    const principalBalance = await DACE_backend.balanceOf(principal);
    const symbol = await DACE_backend.getSymbol();
    setSymbol(symbol);
    setBalance(principalBalance.toLocaleString());
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={balance.length === 0}>This account has a balance of {balance} {symbol}.</p>
    </div>
  );
}

export default Balance;
