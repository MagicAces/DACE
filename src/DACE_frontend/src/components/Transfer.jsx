import React, { useState } from "react";
import { canisterId, createActor } from "../../../declarations/DACE_backend";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";

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

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    })

    const message = await authenticatedCanister.transfer(toPrincipal, Number(amount));
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
