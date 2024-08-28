import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { removeFromCart } from '../redux/slices/cartSlice';
import './CartPage.css';
import PurchaseModal from '../Components/PurchaseModal';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState(cartItems.map(() => 1));
  const [showModal, setShowModal] = useState(false);
  const [country, setCountry] = useState('');

  useEffect(() => {
    // Get the user's country based on their location or computer settings
    const userCountry = navigator.language.split('-')[1] || 'Unknown';
    setCountry(userCountry);
  }, []);

  const handleRemoveFromCart = (itemToRemove) => {
    dispatch(removeFromCart(itemToRemove));
    const updatedQuantities = cartItems.map((item) =>
      item.id === itemToRemove.id ? 0 : quantities[cartItems.indexOf(item)]
    );
    setQuantities(updatedQuantities);
  };

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const totalPrice = cartItems.reduce((total, item, index) => total + item.price * quantities[index], 0) + 5;

  const handleMakePayment = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="cart-section">
      <MDBContainer className="py-5">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol size="12">
            <MDBCard className="card-registration card-registration-2" style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-0">
                <MDBRow className="g-0">
                  <MDBCol lg="8" className="bg-body-tertiary">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0">Shopping Cart</h1>
                        <h6 className="mb-0 text-muted">{cartItems.length} items</h6>
                      </div>

                      <hr className="my-4" />

                      {cartItems.map((item, index) => (
                        <div key={item.id} className="row mb-4 d-flex justify-content-between align-items-center">
                          <div className="col-md-2 col-lg-2 col-xl-2">
                            <img src={item.poster} className="img-fluid rounded-3" alt={item.title} />
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-3">
                            <h6 className="mb-0">{item.title}</h6>
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <MDBBtn
                              color="link"
                              className="px-2"
                              onClick={() => handleQuantityChange(index, quantities[index] - 1)}
                              disabled={quantities[index] === 1}
                            >
                              <i className="fas fa-minus"></i>
                            </MDBBtn>

                            <MDBInput
                              min="1"
                              value={quantities[index]}
                              type="number"
                              size="sm"
                              className="form-control form-control-sm text-white"
                              onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                            />

                            <MDBBtn
                              color="link"
                              className="px-2"
                              onClick={() => handleQuantityChange(index, quantities[index] + 1)}
                            >
                              <i className="fas fa-plus"></i>
                            </MDBBtn>
                          </div>
                          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h6 className="mb-0">${(item.price * quantities[index]).toFixed(2)}</h6>
                          </div>
                          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                            <MDBBtn color="danger" size="sm" onClick={() => handleRemoveFromCart(item)}>
                              Remove
                            </MDBBtn>
                          </div>
                        </div>
                      ))}

                      <hr className="my-4" />

                      <div className="pt-5">
                        <h6 className="mb-0">
                          <Link to="/" className="text-body">
                            <i className="fas fa-long-arrow-alt-left me-2"></i>Back to Home
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol lg="4" className="bg-body-tertiary">
                    <div className="p-5">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase">items {cartItems.length}</h5>
                        <h5>
                          $
                          {cartItems.reduce((total, item, index) => total + item.price * quantities[index], 0).toFixed(2)}
                        </h5>
                      </div>

                      <h5 className="text-uppercase mb-3">Shipping</h5>
                      <div className="mb-4 pb-2">
                        <select className="select">
                          <option value="1">Standard-Delivery- $5.00</option>
                          <option value="2">premium $40</option>
                          <option value="3">Three</option>
                          <option value="4">Four</option>
                        </select>
                      </div>

                      <h5 className="text-uppercase mb-3">Give code</h5>
                      <div className="mb-5">
                        <MDBInput label="Enter your code" />
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Total price</h5>
                        <h5 className="text-white">${totalPrice.toFixed(2)}</h5>
                      </div>

                      <MDBBtn color="dark" block size="lg" onClick={handleMakePayment}>
                        Make Payment
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        {showModal && (
          <PurchaseModal
            items={cartItems}
            purchaseTime={new Date().toLocaleString()}
            totalAmount={cartItems.reduce((total, item, index) => total + item.price * quantities[index], 0) + 5}
            onClose={closeModal}
            country={country}
          />
        )}
      </MDBContainer>
    </section>
  );
};

export default CartPage;