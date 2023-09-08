import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import './App.css'
import ViewAllItems from './components/ViewAllItems';
import LoginPage from './components/LoginPage';
import { useState } from 'react';
import BidOnItem from './components/BidOnItem';

function App() {
  const [userLoginCredentials, setUserLoginCredentials] = useState({
    web3: null,
    account: null,
    contract: null
  });

  const saveLoginCredentials = ({web3, account, contract}) => {
    setUserLoginCredentials({
      web3: web3,
      account: account,
      contract: contract
    })
  } 

  console.log(userLoginCredentials);

  const router = createBrowserRouter([
    {path: '/', element: <LoginPage saveLoginCredentials={saveLoginCredentials}/>},
    {path: '/view-all-items', element: <ViewAllItems userLoginCredentials={userLoginCredentials}/>},
    {path: '/bid-on-item', element: <BidOnItem userLoginCredentials={userLoginCredentials}/>}
  ]);

  return (
    <>
      <RouterProvider router = {router}/>
    </>
  );
}

export default App;
