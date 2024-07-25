import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ModalWrapper.module.scss';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import { CloseLoginIcon } from '../Icons';

const cx = classNames.bind(styles);

function ModalWrapper({ children }) {
  const [closeLogin, setCloseLogin] = useState(true);

  console.log(closeLogin);

  const handleCloseLogin = () => {
    setCloseLogin((prev) => !prev);
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

ModalWrapper.propTypes = {};

export default ModalWrapper;
