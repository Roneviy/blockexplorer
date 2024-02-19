# Ethereum Block Explorer

![Снимок экрана 2024-02-19 234237](https://github.com/Roneviy/blockexplorer/assets/147179910/8360c60f-39b2-40c3-a2d2-f99d16510da8)

The code represents a simple block explorer application built using React. It retrieves data from the Ethereum blockchain using the Alchemy SDK and displays information about the latest block, searched blocks, and searched addresses.

Components and Libraries Used:
Alchemy SDK: Used to interact with the Ethereum blockchain.
React: JavaScript library for building user interfaces.
Features:
Fetching Latest Block: Retrieves information about the latest block on the Ethereum blockchain and displays its details, including block hash, parent hash, timestamp, gas used, gas limit, and the number of transactions.
Searching for a Block by Hash: Allows users to search for a specific block by entering its hash. Upon entering a valid block hash, the application fetches and displays details about the searched block similar to the latest block.
Searching for Address Balance: Enables users to search for the balance of a specific Ethereum address. Upon entering a valid address, the application fetches the balance from the blockchain and displays it in ETH units.
Code Structure:
Fetch Functions: fetchEthPrice(), fetchLatestBlock(), fetchSearchedBalance(), and fetchSearchedBlock() are asynchronous functions responsible for fetching Ethereum price, the latest block, searched balance, and searched block details, respectively.
State Management: Utilizes React's useState hook to manage state variables such as latestBlock, searchedBlockHash, searchedBlock, searchedAddress, and searchedBalance.
Event Handlers: handleSearchInputChange() is a function responsible for handling changes in input fields and updating the corresponding state variables accordingly.
Effect Hooks: Utilizes React's useEffect hook to perform side effects such as fetching data and updating the UI based on changes in state variables.
Rendering: Renders the UI elements using JSX, including headings, input fields, and block details.
