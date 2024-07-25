import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './LoginDefault.module.scss';

import LoginItem from '../../LoginItem';

const cx = classNames.bind(styles);

function LoginDefault({ data = [] }) {
  console.log(data);

  const [history, setHistory] = useState([data]);
  const [currentData, setCurrentData] = useState(data);

  useEffect(() => {
    // Update currentData when history changes
    setCurrentData(history[history.length - 1]);
  }, [history]);

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('header')}>{data.title}</h2>
      <div className={cx('content')}>
        {currentData.data.map((item, index) => (
          <LoginItem key={index} data={item} />
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
        Don't have an account?
        <a href="/" className={cx('bottom-sign-up')}>
          {' '}
          Sign up{' '}
        </a>
      </footer>

    </div>
  );
}

LoginDefault.propTypes = {};

export default LoginDefault;
