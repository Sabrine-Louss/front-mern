import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { LoginUser } from '../redux/slices/UserSlice';
import './Login.css';

const Login = () => {
  const { isAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  useEffect(() => {
    if (isAuth) {
      navigate('/home');
    }
  }, [isAuth, navigate]);

  const onSubmit = (data) => {
    dispatch(LoginUser(data));
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        {...register('email', { required: true })}
                        style={{ borderRadius: '0.5rem', border: '1px solid #ccc' }}
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        placeholder={emailValue ? '' : 'Email'}
                      />
                      {errors.email && <span className="text-danger">Please enter a valid email address.</span>}
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        {...register('password', {
                          required: true,
                          minLength: 5,
                          maxLength: 12,
                          pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i,
                        })}
                        style={{ borderRadius: '0.5rem', border: '1px solid #ccc' }}
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                        placeholder={passwordValue ? '' : 'Password'}
                      />
                      {errors.password && (
                        <span className="text-danger">
                          Password must be between 5 and 12 characters, contain at least one uppercase letter, one
                          lowercase letter, and one number.
                        </span>
                      )}
                    </div>

                    <p className="small mb-5 pb-lg-2">
                      <a href="#!" className="text-white-50">
                        Forgot password?
                      </a>
                    </p>

                    <button className="btn btn-outline-light btn-lg px-5" type="submit">
                      Login
                    </button>

                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white">
                        <i className="fab fa-facebook-f fa-lg"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-google fa-lg"></i>
                      </a>
                    </div>
                  </form>
                </div>

                <div>
                  <p className="mb-0">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-white-50 fw-bold">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;