import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ViewAllItems from "./ViewAllItems";

const BidOnItem = ({ userLoginCredentials }) => {
  const navigateTo = useNavigate();

  const itemBidding = async (event) => {
    event.preventDefault();

    const itemLabel = document.querySelector("#id").value;
    const bidLabel = document.querySelector("#bidAmount").value;

    try {
      const res = await fetch(`http://localhost:3000/api/post/placeBid/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await res.json();

      if (data.status === 200) {
        const { account, contract } = userLoginCredentials;

        await contract.methods
          .placeBid(itemLabel, bidLabel)
          .send({ from: account });

        alert("Bid placed!");

        navigateTo("/view-all-items");
      } else {
        throw new Error("Error!!");
      }

      navigateTo("/view-all-items");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ViewAllItems/>
      <center>
        <form>
          <input id="id"></input>
          <input id="bidAmount"></input>
          <button type="submit" onClick={itemBidding}>
            Place the bid
          </button>
        </form>
      </center>
    </>
  );
};

BidOnItem.propTypes = {
  userLoginCredentials: PropTypes.func.isRequired,
};

export default BidOnItem;
