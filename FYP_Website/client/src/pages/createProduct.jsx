import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/createProduct.css';

function CreateProduct() {
    const navigate = useNavigate();
    const [selectedProductType, setSelectedProductType] = useState('');
    const [name, setName] = useState('');
    const [modelNumber, setModelNumber] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [productTypeError, setProductTypeError] = useState(null);
    const [nameError, setNameError] = useState(null);
    const [modelNumberError, setModelNumberError] = useState(null);
    const [descriptionError, setDescriptionError] = useState(null);
    const [priceError, setPriceError] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [imageUrlError, setImageUrlError] = useState(null);
    const [productTypes, setProductTypes] = useState([]);
    const [production_time, setproduction_time] = useState('');
    const [production_timeError, setproduction_timeError] = useState(null);
    const [percentage, setpercentage] = useState('');
    const [percentageError, setpercentageError] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:3001/bikeTypes')
            .then((response) => {
                console.log('basclete', response.data);
                setProductTypes(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error fetching product types:', error);
            });
    }, []);

    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);
        if (e.target.value) {
            setImageUrlError(''); // clear error if input is not empty
        } else {
            setImageUrlError('Please enter the image URL'); // set error if input is empty
        }
    };

    const handleProductTypeChange = (e) => {
        setSelectedProductType(e.target.value);
        console.log((e.target.value))
        console.log(('faw2a'))
        if (e.target.value) {
            setProductTypeError(''); // clear error if input is not empty
        } else {
            setProductTypeError('Please select a product type'); // set error if input is empty
        }
    };
    

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (e.target.value) {
            setNameError(''); // clear error if input is not empty
        } else {
            setNameError('Please enter the name'); // set error if input is empty
        }
    };

    const handleProduction_TimeChange = (e) => {
        setproduction_time(e.target.value);
        if (e.target.value) {
            setproduction_timeError(''); // clear error if input is not empty
        } else {
            setproduction_timeError('Please enter the name'); // set error if input is empty
        }
    };
    const handlePercentageChange = (e) => {
        setpercentage(e.target.value);
        if (e.target.value) {
            setpercentageError(''); // clear error if input is not empty
        } else {
            setpercentageError('Please enter the name'); // set error if input is empty
        }
    };


    const handleModelNumberChange = (e) => {
        setModelNumber(e.target.value);
        if (e.target.value) {
            setModelNumberError(''); // clear error if input is not empty
        } else {
            setModelNumberError('Please enter the model number'); // set error if input is empty
        }
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        if (e.target.value) {
            setDescriptionError(''); // clear error if input is not empty
        } else {
            setDescriptionError('Please enter the description'); // set error if input is empty
        }
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
        if (e.target.value) {
            setPriceError(''); // clear error if input is not empty
        } else {
            setPriceError('Please enter the price'); // set error if input is empty
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if fields are empty and set error state
        if (!imageUrl) {
            setImageUrlError('Please enter the image URL');
        }

        if (!selectedProductType) {
            setProductTypeError('Please select a product type');
        }

        if (!name) {
            setNameError('Please enter the name');
        }

        if (!modelNumber) {
            setModelNumberError('Please enter the model number');
        }

        if (!description) {
            setDescriptionError('Please enter the description');
        }

        if (!price) {
            setPriceError('Please enter the price');
        }
        if (!production_time) {
            setproduction_timeError('Please enter the production time');
        }
        if (!percentage) {
            setpercentageError('Please enter the percentage');
        }

        // Only submit the form if no fields are empty
        if (imageUrl && selectedProductType && name && modelNumber && description && price && production_time && percentage) {
            axios.post('http://localhost:3001/createProduct', {
                bike_type_id: selectedProductType,
                name: name,
                model_number: modelNumber,
                description: description,
                price: price,
                image_url: imageUrl,
                production_time : production_time,
                percentage : percentage
            })
            .then(response => {
                console.log(response);
                navigate('/main/products');
            })
            .catch(error => {
                console.error('Error creating product:', error);
            });
        }
    };

    return (
        <div className='create-product-container'>
            <div className='create-product-header'>
            <h1>Create Product</h1>
            </div>
            <div style={{ textAlign: "left" }}>
                
            </div>

            <form className='create-product-form' onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label>
                        Product Type:
                        <select value={selectedProductType} onChange={handleProductTypeChange}>
                            <option value="">Select a product type</option>
                            {productTypes.map(productType => (
                                <option key={productType.bike_type_id} value={productType.bike_type_id}>
                                    {productType.bike_type}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                    {productTypeError && <p className="error">{productTypeError}</p>}

                <div className='input-group'>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={handleNameChange} />
                    </label>
                </div>
                    {nameError && <p className="error">{nameError}</p>}

                <div className='input-group'>
                    <label>
                        Model Number:
                        <input type="text" value={modelNumber} onChange={handleModelNumberChange} />
                    </label>
                </div>
                    {modelNumberError && <p className="error">{modelNumberError}</p>}

                <div className='input-group'>
                    <label>
                        Description:
                        <textarea value={description} onChange={handleDescriptionChange} />
                    </label>
                </div>
                    {descriptionError && <p className="error">{descriptionError}</p>}

                <div className='input-group'>
                    <label>
                        Price:
                        <input type="text" value={price} onChange={handlePriceChange} />
                    </label>
                </div>
                    {priceError && <p className="error">{priceError}</p>}

                <div className='input-group'>
                    <label>
                        Image URL:
                        <input type="text" value={imageUrl} onChange={handleImageUrlChange} />
                    </label>
                </div>
                    {imageUrlError && <p className="error">{imageUrlError}</p>}

                    <div className='input-group'>
                    <label>
                        Production Time:
                        <input type="number" value={production_time} onChange={handleProduction_TimeChange} />
                    </label>
                </div>
                    {production_timeError && <p className="error">{production_timeError}</p>}
                    <div className='input-group'>
                    <label>
                        Percentage:
                        <input type="number" value={percentage} onChange={handlePercentageChange} />
                    </label>
                </div>
                    {percentageError && <p className="error">{percentageError}</p>}

                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateProduct;