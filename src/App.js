import "./App.css";
import ConnectWalletButton from "./components/connectWalletButton";
import MintCounter from "./components/mint_counter";
import MintedCount from "./components/minted_count";
import { useEffect, useState } from "react";

import contract from "./contract";

function App() {
  var [initialized, setInitilized] = useState(false);

  const initContract = async () => {
    setInitilized(false);
    const result = await contract.initializeContract();

    if (result !== undefined) {
      setInitilized(true);
    }
  };

  const onWalletConnected = async () => {
    initContract();
  };

  // useEffect(() => {
  //   initContract();
  // });

  return (
    <div className="App">
      <div data-wf-quick-add-section="nav" className="section wf-section">
        <div className="site_content">
          <div className="sc_image">
            <img
              src="https://uploads-ssl.webflow.com/621a1614d55d180309599386/621b72fd1b1065ec960b69da_sc_lady.png"
              loading="lazy"
              alt="SCLadies Lady"
              className="image-2"
            />
          </div>
          <div className="text_content">
            <div className="scl_logo"></div>
            <MintedCount />
            <div className="minted">MINTED</div>
            <ConnectWalletButton onWalletConnected={onWalletConnected} />
            <MintCounter />
            <div className="win_image"></div>
          </div>
          
        </div>
      </div>
      <div className="social_footer">
        <div className="follow_us">FOLLOW US</div>
        <div className="social_links">
          <a href="https://www.twitter.com/scladiesnfts" target="_blank" rel="noreferrer" className="social_link w-inline-block">
            <img
              src="https://uploads-ssl.webflow.com/621a1614d55d180309599386/621a2287ae7db67852e2bb25_akar-icons_twitter-fill.svg"
              loading="lazy"
              width="20"
              height="20"
              alt="twitter logo"
              className="image"
            />
          </a>
          <a href="https://discord.gg/scladies" target="_blank" rel="noreferrer" className="social_link w-inline-block">
            <img
              src="https://uploads-ssl.webflow.com/621a1614d55d180309599386/621a2287c8b5102dc1bec529_akar-icons_discord-fill.svg"
              loading="lazy"
              width="20"
              height="20"
              alt="discord logo"
              className="image"
            />
          </a>
          <a href="https://opensea.io/collection/sancoiffureladies" target="_blank" rel="noreferrer" className="social_link w-inline-block">
            <img
              src="https://uploads-ssl.webflow.com/621a1614d55d180309599386/621a228713a539609e80cf6f_simple-icons_opensea.svg"
              loading="lazy"
              width="20"
              height="20"
              alt="opensea logo"
              className="image"
            />
          </a>
          <a href="https://etherscan.io/address/0x8F00355A7978D994172491Ace680d6003a56f8A4" target="_blank" rel="noreferrer" className="social_link w-inline-block">
            <img
              src="https://uploads-ssl.webflow.com/621a1614d55d180309599386/621a2287a757f92e9de43beb_Frame.svg"
              loading="lazy"
              width="20"
              alt="etherscan logo"
              className="image"
            />
          </a>
        </div>
      </div>
      <script
        src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=621a1614d55d180309599386"
        type="text/javascript"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
        crossOrigin="anonymous"
      ></script>
      <script src="./generated.js" type="text/javascript"></script>
    </div>
  );
}

export default App;
