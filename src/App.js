import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function fetchEthPrice() {
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
    .then(response => response.json())
    .then(data => {
      const ethPrice = data.ethereum.usd;
      document.querySelector('.price').innerText = `ETH PRICE: $${ethPrice}`;
    })
    .catch(error => {
      console.error('Error fetching ETH price:', error);
    });
};

fetchEthPrice();

setInterval(fetchEthPrice, 45000);

function App() {
  const [latestBlock, setLatestBlock] = useState(null);
  const [searchedBlockHash, setSearchedBlockHash] = useState('');
  const [searchedBlock, setSearchedBlock] = useState(null);
  const [searchedAddress, setSearchedAddress] = useState('');
  const [searchedBalance, setSearchedBalance] = useState(null);

  useEffect(() => {
    async function fetchLatestBlock() {
      try {
        const latestBlock = await alchemy.core.getBlock('latest');
        setLatestBlock(latestBlock);
      } catch (error) {
        console.error('Error fetching latest block:', error);
      }
    }

    fetchLatestBlock();
  }, []);

  const handleSearchInputChange = (event) => {
    if (event.target.name === 'blockHash') {
      setSearchedBlockHash(event.target.value);
    } else if (event.target.name === 'address') {
      setSearchedAddress(event.target.value);
    }
  };

  useEffect(() => {
    async function fetchSearchedBalance() {
      try {
        const balanceHex = await alchemy.core.getBalance(searchedAddress);
        const balanceNumber = parseInt(balanceHex, 16);
        const balanceString = balanceNumber.toString();
        const balance = balanceString.slice(0, 5); 
        setSearchedBalance(balance);
      } catch (error) {
        console.error('Error fetching searched balance:', error)
      }
    }
  
    fetchSearchedBalance();
  }, [searchedAddress]);

  useEffect(() => {
    async function fetchSearchedBlock() {
      try {
        if (searchedBlockHash) {
          const block = await alchemy.core.getBlock(searchedBlockHash);
          setSearchedBlock(block);
        }
      } catch (error) {
        console.error('Error fetching searched block:', error);
      }
    }

    fetchSearchedBlock();
  }, [searchedBlockHash]);

  return (
    <div>
      <div>
        <h1 className='hat'>Block Explorer</h1>
        <h4 className='price'>ETH PRICE</h4>
      </div>
      <div className='Main'>
        <div className='container'>
          <div className='Box1'>
            <div className='Latest-block'>
              <h2>Latest Block Number: {latestBlock?.number}</h2>
              <h3>Block Details</h3>
              {latestBlock && (
                <>
                  <p>Block Hash: {latestBlock.hash}</p>
                  <p>Parent Hash: {latestBlock.parentHash}</p>
                  <p>Block Timestamp: {new Date(latestBlock.timestamp * 1000).toLocaleString()}</p>
                  <p>Gas Used: {latestBlock.gasUsed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                  <p>Gas limit: 30,000,000</p>
                  <p>Number of Transactions: {latestBlock.transactions?.length || 0}</p>
                </>
              )}
            </div>
          </div>
          <div className='Box2'>
            <h2>Find a block</h2>
            <input type="text" name="blockHash" value={searchedBlockHash} onChange={handleSearchInputChange} placeholder="Block hash" className="crypto-input"/>
            <h3>Block Details</h3>
            {searchedBlock && (
              <>
                <p>Block Hash: {searchedBlock.hash}</p>
                <p>Parent Hash: {searchedBlock.parentHash}</p>
                <p>Block Timestamp: {new Date(searchedBlock.timestamp * 1000).toLocaleString()}</p>
                <p>Gas Used: {searchedBlock.gasUsed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                <p>Gas limit: 30,000,000</p>
                <p>Number of Transactions: {searchedBlock.transactions?.length || 0}</p>
              </>
            )}
          </div>
          <div className='Box3'>
            <h2>Search by address</h2>
            <input type="text" name="address" value={searchedAddress} onChange={handleSearchInputChange} placeholder="Address 0x..." className="crypto-input"/>
            <p>Balance: {searchedBalance} ЕTH</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
