import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './LoginDefault.module.scss';

import LoginItem from '../../LoginItem';

const cx = classNames.bind(styles);

function LoginDefault({ data = [], onClick, onItemClick }) {
  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('header')}>{data.title}</h2>
      <div className={cx('content')}>
        {data.data.map((item, index) => (
          <LoginItem onClick={onItemClick} key={index} data={item} />
        ))}
      </div>

      <div className={cx('policy-confirm-tips')}>
        <p className={cx('text')}>
          {' '}
          By continuing with an account located in
          <a href="/" className={cx('text-link')}>
            {' '}
            Vietnam{' '}
          </a>{' '}
          , you agree to our{' '}
          <a href="/" className={cx('text-link')}>
            Terms of Service
          </a>{' '}
          and acknowledge that you have read our{' '}
          <a href="/" className={cx('text-link')}>
            Privacy Policy
          </a>
        </p>
      </div>

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

LoginDefault.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onItemClick: PropTypes.func,
};

export default LoginDefault;
