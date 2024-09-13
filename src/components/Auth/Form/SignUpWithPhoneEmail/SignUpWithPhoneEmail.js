import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SignUpWithPhoneEmail.module.scss';

import { TriangleIcon } from '~/components/Icons';

import Button from '~/components/Button';

import SignUpWithPhone from '~/components/SignUpWithPhone/SignUpWithPhone';
import SignUpWithEmail from '~/components/SignUpWithEmail/SignUpWithEmail';

const cx = classNames.bind(styles);

function SignUpWithPhoneEmail({ data = [], title, onClick }) {
  const [changeForm, setChangeForm] = useState(true);

  const handleFormChange = () => {
    setChangeForm((prev) => !prev);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <form>
          <h2 className={cx('header')}>{title}</h2>
          <div className={cx('sign-up-title')}>When’s your birthday?</div>

          <div className={cx('btn-selector')}>
            <Button className={cx('btn-choose')} rightIcon={<TriangleIcon className={cx('icon-btn')} />} text>
              Month
            </Button>
            <Button className={cx('btn-choose')} rightIcon={<TriangleIcon className={cx('icon-btn')} />} text>
              Day
            </Button>
            <Button className={cx('btn-choose')} rightIcon={<TriangleIcon className={cx('icon-btn')} />} text>
              Year
            </Button>
          </div>

          <div className={cx('description')}>Your birthday won't be shown publicly.</div>

          {changeForm ? (
            <SignUpWithPhone data={data} onClick={onClick} changeForm={handleFormChange} />
          ) : (
            <SignUpWithEmail data={data} onClick={onClick} changeForm={handleFormChange} />
          )}

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
        </form>

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
    </div>
  );
}

SignUpWithPhoneEmail.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default SignUpWithPhoneEmail;
