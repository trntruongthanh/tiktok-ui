import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './DefaultLayout.module.scss';
import { useContext, useState } from 'react';

import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';

import Auth from '~/components/Auth/Auth';
import { GlobalContext } from '~/Context/GlobalContext';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const { theme } = useContext(GlobalContext);
  const [isClick, setIsClick] = useState(false);

  const handleClick = () => {
    setIsClick((prev) => !prev);
  };

  return (
    <div className={cx('wrapper')}>
      <Header onClick={handleClick} />

      <div className={cx('container')}>
        <Sidebar onClick={handleClick} />
      </div>

      <div className={cx('content', { light: theme === 'light', dark: theme === 'dark' })}>{children}</div>

      {isClick && <Auth setIsClick={setIsClick} />}
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
