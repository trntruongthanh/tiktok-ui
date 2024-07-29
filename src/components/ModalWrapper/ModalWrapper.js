import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ModalWrapper.module.scss';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import { CloseLoginIcon } from '../Icons';

const cx = classNames.bind(styles);

function ModalWrapper({ children, setIsClick }) {
  const [closeLogin, setCloseLogin] = useState(true);

  const handleCloseLogin = () => {
    setCloseLogin((prev) => !prev);
    setIsClick(false);
  };

  return (
    closeLogin && (
      <React.Fragment>
        <div className={cx('wrapper')}>
          <div className={cx('overlay')}></div>
          <PopperWrapper className={cx('content')}>
            <button onClick={handleCloseLogin} className={cx('close-login-icon')}>
              <CloseLoginIcon />
            </button>
            {children}
          </PopperWrapper>
        </div>
      </React.Fragment>
    )
  );
}

ModalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  setIsClick: PropTypes.bool.isRequired,
};

export default ModalWrapper;
