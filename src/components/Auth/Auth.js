import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import { useState } from 'react';

import ModalWrapper from '../ModalWrapper';
import LoginDefault from './Form/LoginDefault/LoginDefault';

import { loginModalData, signupModalData } from '~/temp/data/modals/loginModal';
import LoginWithQr from './Form/LoginQR/LoginQR';
import SignUpForm from './Form/SignUpForm/SignUpForm';

const cx = classNames.bind(styles);

function Auth() {
  return (
    <ModalWrapper>
      <LoginDefault data={loginModalData} />/
    </ModalWrapper>
  );
}

export default Auth;
