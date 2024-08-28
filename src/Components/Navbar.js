import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/slices/UserSlice';
import './ss.css';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.user);
  const { totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark bg-black ${isScrolled ? 'sticky' : ''}`}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand ms-auto me-auto">
          German Parts 
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <button type="button" className="btn btn-light mybtn  text-black">
                  Home
                </button>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {!isAuth && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <button type="button" className="btn btn-warning text-white">
                      Login
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    <button type="button" className="btn btn-light text-black">
                      Register
                    </button>
                  </Link>
                </li>
              </>
            )}
            {isAuth && (
              <>
                <li className="nav-item">
                  <Link to="/cart" className="nav-link">
                    <FaShoppingCart className="cart-icon" />
                    {totalItems > 0 && <span className="cart-counter">{totalItems}</span>}
                  </Link>
                </li>
                <li className="nav-item">
                  <button type="button" className="btn btn-danger" onClick={() => dispatch(logout())}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;