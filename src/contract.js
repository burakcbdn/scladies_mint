/* eslint-disable import/no-anonymous-default-export */
import config from "./config";
import { ethers } from "ethers";
import abi from "./abi.json";

var SCLContract;

var browserNotSupported = false;

async function initializeContract() {
  const { ethereum } = window;

  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);

    const signer = provider.getSigner();

    SCLContract = new ethers.Contract(config.contractAddress, abi, signer);

    return SCLContract;
  } else {
    alert("Please install metamask or change to the browser that supports metamask!");
    browserNotSupported = true;
  }
}

async function mint(amount) {
  try {
    let tx = await SCLContract.mint(amount, {
      value: ethers.utils.parseEther((amount * 0.064).toString()),
    });

    await tx.wait();

    return tx.hash;
  } catch (e) {
    alert(e.error.message);
    return false;
  }
}

async function firstLadyMint(amount, proof) {
  try {
    let tx = await SCLContract.firstLadyMint(amount, proof, {
      value: ethers.utils.parseEther((amount * 0.034).toString()),
    });

    await tx.wait();

    return tx.hash;
  } catch (e) {
    alert(e.error.message);
    return false;
  }
}

async function getTotalMinted() {
  try {
    let tx = await SCLContract.totalSupply();

    var totalMinted = parseInt(tx._hex, 16);

    return totalMinted;
  } catch (e) {
    return 0;
  }
}

async function getContractActive() {
  try {
    let tx = await SCLContract.paused();

    return tx;
  } catch (e) {
    return false;
  }
}

async function getPreSaleActive() {
  try {
    let tx = await SCLContract.preSale();

    return tx;
  } catch (e) {
    return false;
  }
}

export default { initializeContract, SCLContract, browserNotSupported, getTotalMinted, getContractActive, getPreSaleActive, firstLadyMint, mint };
