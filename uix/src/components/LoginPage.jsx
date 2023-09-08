import Web3 from "web3";
import ABI from "../../misc/ABI.json";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const LoginPage = ({ saveLoginCredentials }) => {
  const navigateTo = useNavigate();

  const walletLogin = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const contract = new web3.eth.Contract(
          ABI,
          "0x35eE37d6d70777C00ca6807A820f67E7325c5e46"
        );

        console.log(web3, accounts, contract);

        saveLoginCredentials({
          web3: web3,
          account: accounts[0],
          contract: contract,
        });
      } else {
        throw new Error();
      }

      navigateTo("/bid-on-item");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={walletLogin}>Connect</button>
    </>
  );
};

LoginPage.propTypes = {
  saveLoginCredentials: PropTypes.func.isRequired,
};

export default LoginPage;
