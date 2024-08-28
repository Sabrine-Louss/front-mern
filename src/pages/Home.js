import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProducts } from '../redux/slices/ProductSlice';
import ProductList from '../Components/Productlist';
import ChatApp from '../Components/ChatApp';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(GetProducts());
  }, [dispatch]);

  return (
    <div className="home-container">
      <div className="hero-section">
        <img
          src="https://files.porsche.com/filestore/image/multimedia/none/992-gt3-rs-modelimage-sideshot/model/cfbb8ed3-1a15-11ed-80f5-005056bbdc38/porsche-model.png"
          alt="Porsche GT3RS"
          className="hero-image"
        />
        <h1 className="hero-title">Unleash the Power</h1>
        <p className="hero-subtitle">Upgrade your Porsche GT3RS with our premium parts</p>
      </div>

      <div className="featured-products">
        <h2 className="section-title">Featured Products</h2>
        <ProductList products={products.slice(0, 3)} />
      </div>

      <div className="product-categories">
        <h2 className="section-title">Explore Parts Categories</h2>
        <div className="category-grid">
          <div className="category-card">
            <img
              src="https://hips.hearstapps.com/vidthumb/images/230911-gfp-093046d-6511d50636b22.jpg?crop=1.00xw:1.00xh;0,0"
              alt="Engine Parts"
              className="category-image"
            />
            <h3 className="category-title">Engine</h3>
          </div>
          {/* Add more category cards here */}
        </div>
      </div>

      <div className="all-products">
        <h2 className="section-title">All Products</h2>
        <ProductList products={products} />
      </div>

      <div className="testimonials">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonial-card">
          <p className="testimonial-text">
            "The Porsche GT3RS parts from this website are top-notch! They've taken my car's performance to the next level."
          </p>
          <p className="testimonial-author">- Habib</p>
        </div>
        {/* Add more testimonial cards here */}
      </div>

      <div className="cta-section">
        <h2 className="cta-title">Elevate Your Driving Experience</h2>
        <button className="cta-button">Browse Products</button>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <p>Sousse</p>
            <p>Sahloul</p>
            <p>Phone: (216) 20 202 202</p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Follow Us</h3>
            <ul className="social-links">
              <li>
                <a href="#">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Newsletter</h3>
            <p>Subscribe to our newsletter for updates and special offers.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <p className="footer-copyright">&copy; 2024 German Parts. All rights reserved.</p>
      </footer>

      {/* Add the ChatApp component */}
      <ChatApp />
    </div>
  );
};

export default Home;