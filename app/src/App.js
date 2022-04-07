import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
// STEP 5 SET WALLET DATA IN REACT STATE
import React, { useEffect, useState } from 'react';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = 'TopShotTurtles';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // STEP 5
  // STATE
  const [walletAddress, setWalletAddress] = useState(null);
  // STEP 1 declare wallet check function here 
  // ACTIONS
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana && solana.isPhantom) {
        console.log('Phantom wallet found!');
        // STEP 3 the solana object gives us a function that will allow us to connect to user's wallet
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          'Connected with Public Key: ',
          response.publicKey.toString()
        );

        // STEP 5
        setWalletAddress(response.publicKey.toString());
      } else {
        alert ('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.log(error);
    }
  };
  // STEP 4 define so it does not break first
  const connectWallet = async () => {
    // STEP 7 Include logic
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  // We want to render this UI when the user has not connected their wallet to App yet
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  )

  // STEP 2 when our component first mounts, let's check to see if we have a connected Phantom Wallet
  useEffect (() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return() => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        {/* Check for walletAddress and then pass in walletAddress */}
      {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>  
  );
};

export default App;
