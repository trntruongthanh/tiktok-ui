import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './LoginTip.module.scss';
import Button from '../Button';
import { useContext } from 'react';
import { GlobalContext } from '~/Context/GlobalContext';

const cx = classNames.bind(styles);

function LoginTip({ onClick }) {
  const { theme } = useContext(GlobalContext);

  return (
    <div className={cx('login-tip')}>
      <p className={cx('quote', { light: theme === 'light', dark: theme === 'dark' })}>
        Log in to follow creators, like videos, and view comments.
      </p>
      <Button
        onClick={onClick}
        className={cx('login-btn', { light: theme === 'light', dark: theme === 'dark' })}
        outline
        large
      >
        Log In
      </Button>
    </div>
  );
}

LoginTip.propTypes = {
  onClick: PropTypes.func,
};

export default LoginTip;
