import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './LoginTip.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

function LoginTip() {
  return (
    <div className={cx('login-tip')}>
      <p>Log in to follow creators, like videos, and view comments.</p>
      <Button className={cx('login-btn')} outline large >Log In</Button>
    </div>
  );
}

LoginTip.propTypes = {};

export default LoginTip;
