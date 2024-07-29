import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './LoginUse.module.scss';

import { TriangleIcon } from '~/components/Icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function LoginUse({ title, data = [], onClick}) {
  return (
    <div className={cx('wrapper')}>
      <form className={cx('container')}>
        <h2 className={cx('header')}>{title}</h2>

        <div className={cx('description')}>
          Phone
          <a className={cx('description-link')} href="/">
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
          <input className={cx('phone-input-number')} placeholder="Phone number" type="text"></input>
        </div>

        <div className={cx('phone-code-container')}>
          <div className={cx('input-code')}>
            <input className={cx('phone-input-digit-code')} placeholder="Enter 6-digit code" type="text"></input>
          </div>
          <Button disabled large text className={cx('btn-send-code')}>
            Send code
          </Button>
        </div>

        <a className={cx('link-login')} href="/">
          Log in with password
        </a>

        <Button className={cx('btn-login')} disabled large text>
          Log in
        </Button>
      </form>

      <footer className={cx('bottom-text')}>
        {data.footer.title}
        <a
          onClick={(e) => {
            e.preventDefault();
            onClick()
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

LoginUse.propTypes = {};

export default LoginUse;
