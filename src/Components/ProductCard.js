import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="col-md-2 mb-2 product-card">
      <div className="card h-100">
        <img src={product.poster} className="card-img-top" alt={product.title} />
        <div className="card-body bg-black">
          <h5 className="card-title text-white">{product.title}</h5>
          <p className="card-text text-light">{product.description}</p>
          <p className="card-text font-weight-bold text-white">Price: ${product.price}</p>
          <button className="btn btn-dark" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
