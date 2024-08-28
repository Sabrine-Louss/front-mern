import React from 'react';

const PurchaseModal = ({ items, purchaseTime, totalAmount, onClose, country }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Purchase Success</h2>
        <p>Purchased Items Details:</p>
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
        <p>Purchase Time: {purchaseTime}</p>
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
        <p>Country: {country}</p>
      </div>
    </div>
  );
};

export default PurchaseModal;