import React, { useEffect, useState } from "react";

import config from "../config";
import contract from "../contract";
import "../additional_styles.css";
import well_done from "../well_done.png";
import loading_svg from "./loading.svg";

import Modal from "react-modal";

Modal.setAppElement("#root");

function ConnectWalletButton(props) {

  useEffect(() => {
    checkBrowserSupport();
  });

  const [canUseMetamask, setCanUseMetamask] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  var [hashResult, setHashResult] = useState("");
  var [loading, setLoading] = useState(false);
  var [preSale, setPreSale] = useState(false);

  const updateMetamaskStatus = (val) => {
    setCanUseMetamask(val);
  };

  /* 
        Checks browser support for Metamask or other wallets, if so user can continue operatin,
        otherwise user will be alerted with warning.
    
        If user connected account before, automatically loads the previously connected account.
    
        Supported browsers
    
        [Chrome, Firefox, Edge]
    
      */
  const checkBrowserSupport = async () => {
    const ethereum = window.ethereum;

    if (config.currentAddress !== undefined) {
      return;
    }

    if (ethereum) {
      // browser supports Metamask
      updateMetamaskStatus(true);

      const addresses = await ethereum.request({ method: "eth_accounts" });
      const address = addresses[0];

      if (address !== undefined) {
        props.onWalletConnected(address);
        console.log("Address: " + address);
        config.currentAddress = address;
  
        setWalletConnected(true);
      }
    } else {
      // browser does not support Metamask or not installed
      updateMetamaskStatus(false);
      alert("Please install metamask or use browser that supports metamask");
    }
  };

  /* 
        Request metamask connection on ButtonPress if available, 
        If connection is succeed updates the UI with currently connected address
      */
  const requestMetamaskConnection = async () => {
    const ethereum = window.ethereum;
    if (!ethereum) {
      alert("Your browser does not have metamask installed. Please install metamask!");
      setLoading(false);
      return;
    }

    try {
      const addresses = await ethereum.request({ method: "eth_requestAccounts" });
      const address = addresses[0];
      setLoading(false);
      if (address !== undefined) {
        props.onWalletConnected(address);

        config.currentAddress = address;
        setWalletConnected(true);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      switch (e.code) {
        case 4001:
          alert("Connection rejected by you.");
          setLoading(false);
          break;
        default:
      }
    }
  };

  const getButtonStatus = () => {
    return canUseMetamask ? (walletConnected ? "MINT" : "CONNECT WALLET") : "NOT ALLOWED";
  };

  const firstLadyMint = async () => {
    const amount = config.mintAmount;

    const result = await fetch(config.requestURL + "isFirstLady", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: config.currentAddress,
      }),
    });

    const data = await result.json();

    if (data["isFL"]) {
      const proof = data["proof"];

      var hash = await contract.firstLadyMint(amount, proof);
      setLoading(false);

      if (hash === false) {
        return;
      }

      setHashResult(hash);

      toggleModal();
    } else {
      setLoading(false);
      alert("You are not whitelisted!");
    }
  };

  const handleButtonClick = async () => {
    setLoading(true);

    if (!walletConnected) {
      requestMetamaskConnection();
      return;
    }

    if (loading) {
      return;
    }

    var isPreSaleActive = await contract.getPreSaleActive();

    setPreSale(isPreSaleActive);

    if (isPreSaleActive) {
      firstLadyMint();
      return;
    }

    const amount = config.mintAmount;

    const hash = await contract.mint(amount);
    setLoading(false);

    if (hash === false) {
      return;
    }

    setHashResult(hash);

    toggleModal();
  };

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <img src={well_done} width="150px" alt="Well done"></img>
        <p></p>

        <p>🎉 You minted your SCLadies NFT 🎉</p>

        <p>🎯 You can track your transaction with the link below 🎯</p>
        <a href={`https://etherscan.io/tx/${hashResult}`} target="_blank" rel="noreferrer">
          Etherscan
        </a>
        <div className="button w-button" id="connect_wallet_button" onClick={toggleModal}>
          OK
        </div>
      </Modal>
      <div className="button w-button" id="connect_wallet_button" onClick={handleButtonClick}>
        {loading ? (
          <div style={{ height: "30px", width: "30px" }}>
            <img src={loading_svg} alt="loading"></img>
          </div>
        ) : (
          getButtonStatus()
        )}
      </div>
    </div>
  );
}

export default ConnectWalletButton;
