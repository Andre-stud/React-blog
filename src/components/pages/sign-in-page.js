import './pages.scss';
import { Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { fetchUser } from '../../store/user-slice';

function SignInPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [formError, setFormError] = useState(false);

  const loadStatus = useSelector((state) => state.regUser.status);

  const loading = loadStatus === 'loading';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitSignIn = (value) => {
    const userData = {
      user: {
        email: value.email,
        password: value.password,
      },
    };

    const path = 'users/login';

    dispatch(fetchUser({ userData, path })).then((data) => {
      if (data.payload === true) {
        setFormError(false);
        navigate('/', { replace: true });
      }
      if (data.payload === 'error') {
        setFormError(true);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitSignIn)} className="sing-page">
      <p className="sing-page__header">Sign In</p>
      <label className="sing-page__name-input">
        Email address
        <input
          {...register('email', {
            required: 'Please enter email.',
            pattern: {
              value:
                /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
              message: 'Please enter a valid email.',
            },
          })}
          className="sing-page__input"
          placeholder="Email address"
        />
      </label>
      {errors?.email && <span style={{ color: '#F5222D' }}>{errors?.email?.message || 'Error!'}</span>}
      {formError && !errors?.email ? <span style={{ color: '#F5222D' }}>Wrong email or password.</span> : null}

      <label className="sing-page__name-input">
        Password
        <input
          type="password"
          {...register('password', {
            required: 'Please enter password.',
            minLength: {
              value: 6,
              message: 'Your password needs to be at least 6 characters.',
            },
            maxLength: {
              value: 40,
              message: 'Your user name must be no more than 20 characters.',
            },
          })}
          className="sing-page__input"
          placeholder="Password"
        />
      </label>
      {errors?.password && <span style={{ color: '#F5222D' }}>{errors?.password?.message || 'Error!'}</span>}
      {formError && !errors?.password ? <span style={{ color: '#F5222D' }}>Wrong email or password.</span> : null}

      <Input
        type="submit"
        {...register('test', {
          disabled: loading,
        })}
        className="sing-page__button"
        value="Login"
      />
      <p className="sing-page__question">
        Don’t have an account?{' '}
        <Link to="/sing-up" className="sing-link">
          Sign Up
        </Link>
        .
      </p>
    </form>
  );
}

export default SignInPage;
