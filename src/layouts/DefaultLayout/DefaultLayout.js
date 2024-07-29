import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './DefaultLayout.module.scss';

import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';

import Auth from '~/components/Auth/Auth';
import { useState } from 'react';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const [isClick, setIsClick] = useState(false);

  const handleClick = () => {
    setIsClick((prev) => !prev);
  };

  return (
    <div className={cx('wrapper')}>
      <Header onClick={handleClick} />

      <div className={cx('container')}>
        <Sidebar onClick={handleClick} />

        <div className={cx('content')}>{children}</div>
      </div>

      {isClick && <Auth setIsClick={setIsClick} />}
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
