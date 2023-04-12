import { Input } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchUserPut } from '../../store/user-slice';
import {selectLoadStatus} from '../../selectors/selectors';
import './pages.scss';

function EditProfile() {
  const [nameEmailError, setNameEmailError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadStatus = useSelector(selectLoadStatus);

  const loading = loadStatus === 'loading';

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmitForm = (data) => {
    const newUserData = {
      user: {
        email: data.email,
        password: data.password,
        username: data.username,
        image: data.url,
      },
    };

    dispatch(fetchUserPut(newUserData)).then((value) => {
      if (value.meta.requestStatus === 'fulfilled') {
        navigate('/', { replace: true });
        setNameEmailError(false);
      }
      if (value.meta.requestStatus === 'rejected') {
        setNameEmailError(true);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="sing-page">
      <p className="sing-page__header">Edit Profile</p>

      <label className="sing-page__name-input">
        Username
        <input
          {...register('username', {
            required: 'Please enter a value.',
            pattern: {
              value: /^[a-z][a-z0-9]*$/,
              message: 'You can only use lowercase English letters and numbers',
            },
            minLength: {
              value: 3,
              message: 'Your user name needs to be at least 3 characters.',
            },
            maxLength: {
              value: 20,
              message: 'Your user name must be no more than 20 characters.',
            },
          })}
          className="sing-page__input"
          placeholder="Username"
        />
      </label>
      {nameEmailError ? <span style={{ color: '#F5222D' }}>Data already in use</span> : null}
      {errors?.username && <span style={{ color: '#F5222D' }}>{errors?.username?.message || 'Error!'}</span>}

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
      {nameEmailError ? <span style={{ color: '#F5222D' }}>Data already in use</span> : null}
      {errors?.email && <span style={{ color: '#F5222D' }}>{errors?.email?.message || 'Error!'}</span>}

      <label className="sing-page__name-input">
        New password
        <input
          type="password"
          {...register('password', {
            required: 'Please enter a value.',
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

      <label className="sing-page__name-input">
        Avatar image (url)
        <input
          {...register('url', {
            required: 'Please enter url.',
            pattern: {
              value: /(^https?:\/\/)?[a-z0-9~_\-.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i,
              message: 'Please enter a valid url.',
            },
          })}
          className="sing-page__input"
          placeholder="Avatar image"
        />
      </label>
      {nameEmailError ? <span style={{ color: '#F5222D' }}>Data already in use</span> : null}
      {errors?.url && <span style={{ color: '#F5222D' }}>{errors?.url?.message || 'Error!'}</span>}

      <Input
        type="submit"
        {...register('test', {
          disabled: loading,
        })}
        className="sing-page__button edit-profile-button"
        value="Save"
      />
    </form>
  );
}

export default EditProfile;
