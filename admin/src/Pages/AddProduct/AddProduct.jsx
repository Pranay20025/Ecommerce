import React, { useState, useRef } from 'react';
import './AddProduct.css';
import previewImage from './image.png';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setProduct } from '../../redux/productSlice';

const AddProduct = () => {
  const fileInput = useRef();
  const [file, setFile] = useState(null); 
  const [imagePreview, setImagePreview] = useState(previewImage);
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    oldPrice: "",
    category: "Men",
    type: "Default",
    description: "",
  });

  const handleImageClick = () => {
    fileInput.current.click();
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); 
    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("price", formData.price);
    productData.append("oldPrice", formData.oldPrice);
    productData.append("category", formData.category);
    productData.append("type", formData.type);
    productData.append("description", formData.description);
    if (file) {
      productData.append("image", file);
    }
  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:8000/api/v1/product/create", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        },
        withCredentials: true
      });
      if (response.data.success) {
        alert("Product Created");
        dispatch(setProduct([response.data.product, ...products]));
        resetForm();
      }
    } catch (error) {
      console.error("Error creating product:", error.response ? error.response.data.message : error.message);
      alert("creating product");
    }
  };
  

  const resetForm = () => {
    setFile(null);
    setImagePreview(previewImage);
    setFormData({
      name: "",
      price: "",
      oldPrice: "",
      category: "Men",
      type: "New",
      description: "",
    });
  };

  return (
    <div className="addProduct_container">
      <center><h3>Add Product</h3></center>
      <form onSubmit={handleSubmit}>
        <div className="image_upload_section">
          <img src={imagePreview} alt="preview" onClick={handleImageClick} width={250} />
          <input
            ref={fileInput}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <div className="input_section">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="price_section">
          <div className="price_input">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="old_price_input">
            <label htmlFor="oldPrice">Old Price:</label>
            <input
              type="number"
              id="oldPrice"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>

        <div className="select_section">
          <div>
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={onChangeHandler}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <label htmlFor="type">Type:</label>
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={onChangeHandler}
            >
              <option value="Default">Default</option>
              <option value="New">New</option>
              <option value="Popular">Popular</option>
              
            </select>
          </div>
        </div>

        <div className="description_section">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={onChangeHandler}
            required
          ></textarea>
        </div>

        <div className="button_section">
          <button type="submit">Post</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
