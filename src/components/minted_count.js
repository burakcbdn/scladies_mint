import { useEffect, useState } from "react";
import contract from "../contract";
import config from "../config";

function MintedCount() {
  const fetchMintedCount = async () => {
    const preSaleResult = await fetch(config.requestURL + "isPreSale", {
      method: "GET",
    });

    
    const psData = await preSaleResult.json();
    console.log(psData);
    setPreSale(psData);
    if (config.currentAddress === undefined) {
      const result = await fetch(config.requestURL + "getTotalMinted", {
        method: "GET",
      });
      const data = await result.json();
      console.log(data);
      setMinted(data);
      return;
    }

    var minted = await contract.getTotalMinted();
    setMinted(minted);
  };

  var [mintedCount, setMinted] = useState(0);
  var [preSale, setPreSale] = useState(true);

  useEffect(() => {
    fetchMintedCount();
    //listenEvents()
  });

  return (
    <div className="total_minted" id="total_minted">
      {mintedCount}/{preSale ? "3268" : "6434"}
    </div>
  );
}

export default MintedCount;
