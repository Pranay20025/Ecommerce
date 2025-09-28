import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Address = () => {
  const navigate = useNavigate();
  const [addressDetails, setAddressDetails] = useState({
    street: '',
    city: '',
    pincode: '',
    country: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    setAddressDetails({
      ...addressDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(addressDetails); // This will log the entered address details
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Enter Address Details</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.row}>
          <label style={styles.label}>Street:</label>
          <input
            type="text"
            name="street"
            value={addressDetails.street}
            onChange={handleChange}
            placeholder="Enter your street"
            style={styles.input}
          />
        </div>
        <div style={styles.row}>
          <label style={styles.label}>City:</label>
          <input
            type="text"
            name="city"
            value={addressDetails.city}
            onChange={handleChange}
            placeholder="Enter your city"
            style={styles.input}
          />
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Pincode:</label>
          <input
            type="text"
            name="pincode"
            value={addressDetails.pincode}
            onChange={handleChange}
            placeholder="Enter your pincode"
            style={styles.input}
          />
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Country:</label>
          <input
            type="text"
            name="country"
            value={addressDetails.country}
            onChange={handleChange}
            placeholder="Enter your country"
            style={styles.input}
          />
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={addressDetails.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button} onClick={()=>{navigate("/thankyou")}}>Place Order</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    border: '2px solid #ddd',
    borderRadius: '10px',
    maxWidth: '500px',
    margin: '50px auto',
    backgroundColor: '#f7f7f7',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#555'
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    transition: 'border-color 0.3s',
  },
  inputFocus: {
    borderColor: '#007bff'
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  }
};

export default Address;
