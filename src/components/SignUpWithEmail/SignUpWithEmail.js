import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SignUpWithEmail.module.scss';
import Button from '../Button';
import { SquareIcon } from '../Icons';

const cx = classNames.bind(styles);

function SignUpWithEmail({ changeForm }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('div-container')}>
        <div className={cx('title')}>
          Email
          <a
            onClick={(e) => {
              e.preventDefault();
              changeForm();
            }}
            className={cx('title-link')}
            href="/"
          >
            Sign up with phone
          </a>
        </div>

        <div className={cx('container')}>
          <div className={cx('input-info')}>
            <input className={cx('input-container')} placeholder="Email address" type="text" />
          </div>

          <div className={cx('input-info')}>
            {' '}
            <input className={cx('input-container')} placeholder="Password" type="text" />
          </div>

          <div className={cx('container-code')}>
            <div className={cx('input-code')}>
              <input className={cx('input-digit-code')} placeholder="Enter 6-digit code" type="text"></input>
            </div>
            <Button disabled large text className={cx('btn-send-code')}>
              Send code
            </Button>
          </div>
        </div>

        <div className={cx('div-checkbox')}>
          <div className={cx('div-checkbox-wrapper')}>
            <input className={cx('input-checkbox')} type="checkbox"></input>
            <label className={cx('label-check')}>
              <i className={cx('checkbox-icon')}>
                <SquareIcon className={cx('square-icon')} />
              </i>
            </label>
          </div>

          <label className={cx('label-checkbox-text')}>
            Get trending content, newsletters, promotions, recommendations, and account updates sent to your email
          </label>
        </div>

        <Button className={cx('btn-next')} disabled large text>
          Next
        </Button>
        
      </div>
    </div>
  );
}

SignUpWithEmail.propTypes = {};

export default SignUpWithEmail;
