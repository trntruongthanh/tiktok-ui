import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './LoginUsePhone.module.scss';

import { TriangleIcon } from '~/components/Icons';
import { HidePasswordIcon, ShowPasswordIcon } from '../Icons';

import { useState, useCallback } from 'react';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function LoginUsePhone({ data = [], onClick, changeFormLogin, handleShowHide, showHideState, handleForgotPassword }) {
  const [changeForm, setChangeForm] = useState(true);

  const handleChangeForm = useCallback(() => {
    setChangeForm((prev) => !prev);
  }, []);

  const handleLoginWithCode = useCallback(() => {
    setChangeForm(true);
  }, []);

  const memoizedChangeFormLogin = useCallback(() => changeFormLogin(), [changeFormLogin]);
  const memoizedHandleShowHide = useCallback((e) => handleShowHide(e), [handleShowHide]);
  const memoizedHandleForgotPassword = useCallback(() => handleForgotPassword(), [handleForgotPassword]);
  const memoizedOnClick = useCallback(() => onClick(), [onClick]);

  return (
    <div className={cx('wrapper')}>
      <form className={cx('container')}>
        <h2 className={cx('header')}>Log in</h2>

        <div className={cx('description')}>
          Phone
          <a
            onClick={(e) => {
              e.preventDefault();
              memoizedChangeFormLogin();
            }}
            className={cx('description-link')}
            href="/"
          >
            Log in with email or username
          </a>
        </div>

        <div className={cx('phone-container')}>
          <div className={cx('country-phone-code')}>
            <div className={cx('phone-country')}>
              <span>VN +84</span>
            </div>
            <TriangleIcon className={cx('triangle-icon')} />
          </div>
          <input className={cx('phone-input-number')} placeholder="Phone number" type="text" />
        </div>

        {changeForm ? (
          <>
            <div className={cx('phone-code-container')}>
              <div className={cx('input-code')}>
                <input className={cx('phone-input-digit-code')} placeholder="Enter 6-digit code" type="text" />
              </div>
              <Button disabled large text className={cx('btn-send-code')}>
                Send code
              </Button>
            </div>
            <a
              onClick={(event) => {
                event.preventDefault();
                handleChangeForm();
              }}
              className={cx('link-login')}
              href="/"
            >
              Log in with password
            </a>
          </>
        ) : (
          <>
            <div className={cx('input-container')}>
              <input className={cx('input-use')} placeholder="Password" type={showHideState ? 'text' : 'password'} />
              <button onClick={memoizedHandleShowHide}>
                {showHideState ? (
                  <ShowPasswordIcon className={cx('show-hide-icon')} />
                ) : (
                  <HidePasswordIcon className={cx('show-hide-icon')} />
                )}
              </button>
            </div>
            <div className={cx('container-link')}>
              <a
                onClick={(event) => {
                  event.preventDefault();
                  memoizedHandleForgotPassword();
                }}
                href="/"
                className={cx('div-link')}
              >
                Forgot password?
              </a>
              <span className={cx('span-split-line')}></span>
              <a
                onClick={(event) => {
                  event.preventDefault();
                  handleLoginWithCode();
                }}
                href="/"
                className={cx('div-link')}
              >
                Login in with code
              </a>
            </div>
          </>
        )}

        <Button className={cx('btn-login')} disabled large text>
          Log in
        </Button>
      </form>

      <footer className={cx('bottom-text')}>
        {data.footer.title}
        <a
          onClick={(e) => {
            e.preventDefault();
            memoizedOnClick();
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

LoginUsePhone.propTypes = {
  title: PropTypes.string,
};

export default LoginUsePhone;
