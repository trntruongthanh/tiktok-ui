import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './LoginUse.module.scss';

import LoginUseEmail from '~/components/LoginUseEmail/LoginUseEmail';
import LoginUsePhone from '~/components/LoginUsePhone/LoginUsePhone';

const cx = classNames.bind(styles);

function LoginUse({ data = [], onClick, handleForgotPassword }) {
  const [ChangeFormLogin, setChangeFormLogin] = useState(true);

  const [showHideIcon, setShowHideIcon] = useState(false);

  const handleChangeFormLogin = () => {
    setChangeFormLogin((prev) => !prev);
  };

  const handleShowHide = (e) => {
    e.preventDefault();
    setShowHideIcon((prev) => !prev);
  };

  return (
    <React.Fragment>
      {ChangeFormLogin ? (
        <LoginUsePhone
          data={data}
          onClick={onClick}
          changeFormLogin={handleChangeFormLogin}
          handleShowHide={handleShowHide}
          showHideState={showHideIcon}
          handleForgotPassword={handleForgotPassword}
        />
      ) : (
        <LoginUseEmail
          data={data}
          onClick={onClick}
          changeFormLogin={handleChangeFormLogin}
          handleShowHide={handleShowHide}
          showHideState={showHideIcon}
          handleForgotPassword={handleForgotPassword}
        />
      )}
    </React.Fragment>
  );
}

LoginUse.propTypes = {
  title: PropTypes.string,
};

export default LoginUse;
