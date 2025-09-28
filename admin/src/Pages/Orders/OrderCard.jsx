import axios from 'axios'
import React, { useState } from 'react'

const OrderCard = ({ e }) => {
  const url = "http://localhost:8000/uploads/";

  const [formData, setFormData] = useState({
    status: e.status || "",
  });

  const onChangeHandler = async (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const updateHandler = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/user/order/update/${e._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        alert("Status Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={e._id}>
      <div className="order-format">
        {/* Add null checks for product and user */}
        <img
          className="imgg"
          src={e.product ? url + e.product.image : ""}
          alt={e.product?.name || "No product"}
        />
        <p>{e.product?.name || "No product name"}</p>
        <p>${e.product?.price || "No price"}</p>
        <p>{e.user?.name || "No user name"}</p>
        <p>{e.user?.email || "No user email"}</p>
        <select
          name="status"
          className="selectt"
          onChange={onChangeHandler}
          value={formData.status}
        >
          <option value="Processing">Processing</option>
          <option value="Dispatch">Dispatch</option>
          <option value="Delivered">Delivered</option>
        </select>
        <button
          type="button"
          className="updatebtn"
          onClick={updateHandler}
        >
          Update
        </button>
      </div>
      <hr style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }} />
    </div>
  );
};


export default OrderCard