import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './LoginTip.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

function LoginTip({ onClick }) {
  return (
    <div className={cx('login-tip')}>
      <p>Log in to follow creators, like videos, and view comments.</p>
      <Button onClick={onClick} className={cx('login-btn')} outline large >Log In</Button>
    </div>
  );
}

LoginTip.propTypes = {
  onClick: PropTypes.func,
};

export default LoginTip;
