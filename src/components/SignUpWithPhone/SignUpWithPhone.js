import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SignUpWithPhone.module.scss';

import { TriangleIcon } from '~/components/Icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function SignUpPhone({ changeForm }) {
  return (
    <div className={cx('wrapper')}>
      <form className={cx('container')}>
        <div className={cx('description')}>
          Phone
          <a
            onClick={(e) => {
              e.preventDefault();
              changeForm();
            }}
            className={cx('description-link')}
            href="/"
          >
            Sign up with email
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
        <Button className={cx('btn-login')} disabled large text>
          Next
        </Button>
      </form>
    </div>
  );
}

SignUpPhone.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default SignUpPhone;
