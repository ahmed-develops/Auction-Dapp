import { useEffect, useState } from "react";

const ViewAllItems = () => {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const allItems = async () => {
      const res = await fetch("http://localhost:3000/api/get/AllItems", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await res.json();

      if (data.status === 200) {
        console.log(data.itemList);
        setItemList(data.itemList);
      }
    };

    allItems();
  }, []);

  return (
    <>
      <center>
        {itemList.length > 0 ? (
          itemList.map((val, i) => (
            <div key={i}>
              <h5 key={val}>
                {val.itemId} | {val.name} | {val.description} |{" "}
                {val.itemCurrentHighestBid} | {val.highestBidder}
              </h5>
            </div>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </center>
    </>
  );
};

export default ViewAllItems;
