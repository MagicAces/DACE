import React, { useState } from "react";
import { DACE_backend } from "../../../declarations/DACE_backend";
import { Principal } from "@dfinity/principal";

function Transfer() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isDisabled, setDisable] = useState(false);

  async function handleClick() {
    if(amount === "" || to === "")
      return;
    setDisable(true);
    let toPrincipal = Principal.fromText(to);
    const message = await DACE_backend.transfer(toPrincipal, Number(amount));
    setMessage(message);
    setDisable(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                min={0}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
        </p>
        <p hidden={message.length === 0}>{message}</p>
      </div>
    </div>
  );
}

export default Transfer;
