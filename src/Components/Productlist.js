import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductList;