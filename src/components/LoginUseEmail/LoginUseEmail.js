import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './LoginUseEmail.module.scss';

import Button from '../Button';
import { HidePasswordIcon, ShowPasswordIcon } from '../Icons';

const cx = classNames.bind(styles);

function LoginUseEmail({ data = [], onClick, changeFormLogin, handleShowHide, showHideState, handleForgotPassword }) {
  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('header')}>Log in</h2>

      <div className={cx('description')}>
        Email or username
        <a
          onClick={(e) => {
            e.preventDefault();
            changeFormLogin();
          }}
          href="/"
          className={cx('link-login-phone')}
        >
          Log in with phone
        </a>
      </div>

      <div className={cx('container')}>
        <div className={cx('input-container')}>
          <input className={cx('input-use')} placeholder="Email or username" type="text"></input>
        </div>
        <div className={cx('input-container')}>
          <input className={cx('input-use')} placeholder="Password" type={showHideState ? 'text' : 'password'}></input>
          {showHideState ? (
            <button onClick={handleShowHide}>
              <ShowPasswordIcon className={cx('show-hide-icon')} />
            </button>
          ) : (
            <button onClick={handleShowHide}>
              <HidePasswordIcon className={cx('show-hide-icon')} />
            </button>
          )}
        </div>
      </div>

      <a
        onClick={(event) => {
          event.preventDefault();
          handleForgotPassword();
        }}
        href="/"
        className={cx('link-forgot-password')}
      >
        Forgot password?
      </a>

      <Button className={cx('btn-login')} text>
        Log in
      </Button>

      <footer className={cx('bottom-text')}>
        {data.footer.title}
        <a
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
          href="/"
          className={cx('bottom-sign-up')}
        >
          {' '}
          {data.footer.linkText}{' '}
        </a>
      </footer>
    </div>
  );
}

LoginUseEmail.propTypes = {
  title: PropTypes.string,
};

export default LoginUseEmail;
