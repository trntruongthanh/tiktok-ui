import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ResetPasswordLoginForm.module.scss';

import { useState, useCallback } from 'react';
import Button from '../Button';
import { HidePasswordIcon, ShowPasswordIcon, TriangleIcon } from '../Icons';

const cx = classNames.bind(styles);

function ResetPasswordLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isFormReset, setIsFormReset] = useState(true);

  const togglePasswordVisibility = useCallback((e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  }, []);

  const toggleFormReset = useCallback((e) => {
    e.preventDefault();
    setIsFormReset((prev) => !prev);
  }, []);

  return (
    <div className={cx('wrapper')}>
      <form className={cx('container')}>
        <h2 className={cx('header')}>Reset password</h2>

        <div className={cx('description')}>
          Enter {isFormReset ? 'phone number' : 'email address'}
          <a onClick={toggleFormReset} className={cx('description-link')} href="/">
            Reset with {isFormReset ? 'email' : 'phone number'}
          </a>
        </div>

        {isFormReset ? (
          <div className={cx('phone-container')}>
            <div className={cx('country-phone-code')}>
              <div className={cx('phone-country')}>
                <span>VN +84</span>
              </div>
              <TriangleIcon className={cx('triangle-icon')} />
            </div>
            <input className={cx('phone-input-number')} placeholder="Phone number" type="tel" />
          </div>
        ) : (
          <div className={cx('input-container')}>
            <input className={cx('input-email')} placeholder="Email address" type="text" />
          </div>
        )}

        <div className={cx('phone-code-container')}>
          <div className={cx('input-code')}>
            <input
              className={cx('phone-input-digit-code')}
              placeholder="Enter 6-digit code"
              type="text"
              maxLength="6"
            />
          </div>

          <Button disabled large text className={cx('btn-send-code')}>
            Send code
          </Button>
        </div>

        <div className={cx('input-container')}>
          <input className={cx('input-use')} placeholder="Password" type={showPassword ? 'text' : 'password'} />
          <button onClick={togglePasswordVisibility}>
            {showPassword ? (
              <ShowPasswordIcon className={cx('show-hide-icon')} />
            ) : (
              <HidePasswordIcon className={cx('show-hide-icon')} />
            )}
          </button>
        </div>

        <Button className={cx('btn-login')} disabled large text>
          Log in
        </Button>
      </form>
    </div>
  );
}

ResetPasswordLoginForm.propTypes = {};

export default ResetPasswordLoginForm;
