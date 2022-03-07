import config from "../config";
import { useState, useEffect } from "react";
import contract from "../contract";

function MintCounter() {
  var [mintAmount, setMintAmount] = useState(1);
  var [preSale, setPreSale] = useState(false);

  useEffect(() => {
    fetchPreSale();
  });

  const fetchPreSale = async () => {
    var result = await contract.getPreSaleActive();
    setPreSale(result);
  };

  const incrementAmount = () => {

    if (config.currentAddress === undefined) {
      return;
    }

    var limit = 2;

    if (preSale) {
      limit = 2;
    } else {
      limit = 20;
    }

    if (mintAmount >= limit) {
      return;
    }

    const newAmount = mintAmount + 1;
    setMintAmount(newAmount);
    config.mintAmount = newAmount;
  };

  const decrementAmount = () => {
    const newAmount = mintAmount - 1;

    if (mintAmount === 1) {
      return;
    }
    setMintAmount(newAmount);
    config.mintAmount = newAmount;
  };

  return (
    <div className="mint_counter">
      <div className="counter_button_minus" onClick={decrementAmount} style={{ cursor: "pointer" }}></div>
      <div className="text-block">{mintAmount}</div>
      <div className="counter_button_increment" onClick={incrementAmount} style={{ cursor: "pointer" }}></div>
    </div>
  );
}

export default MintCounter;
