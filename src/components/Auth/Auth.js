import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import { useState } from 'react';

import ModalWrapper from '../ModalWrapper';

import { loginModalData, signupModalData } from '~/temp/data/modals/loginModal';

import ResetPasswordLoginForm from '../ResetPasswordLoginForm/ResetPasswordLoginForm';
import LoginDefault from './Form/LoginDefault/LoginDefault';
import LoginUse from './Form/LoginUse/LoginUse';
import SignUpWithPhoneEmail from './Form/SignUpWithPhoneEmail/SignUpWithPhoneEmail';

const cx = classNames.bind(styles);

function Auth({ setIsClick }) {
  const [formState, setFormState] = useState({
    isDefaultForm: true,
    isUseForm: false,
    isUseEmailForm: false,
    changeForm: true,
    forgotPassword: false,
  });

  const currentForm = formState.isDefaultForm ? loginModalData : signupModalData;

  const updateFormState = (updates) => {
    setFormState((prevState) => ({ ...prevState, ...updates }));
  };

  const handleForm = () => {
    updateFormState({ isDefaultForm: !formState.isDefaultForm });
  };

  const handleUseForm = () => {
    updateFormState({
      isUseForm: false,
      isDefaultForm: false,
      changeForm: true,
    });
  };

  const handleUseEmailForm = () => {
    updateFormState({
      isUseEmailForm: false,
      isDefaultForm: true,
    });
  };

  const handleItemClick = (title) => {
    if (title === 'Use phone / email / username') {
      updateFormState({
        isUseForm: true,
        isDefaultForm: true,
        changeForm: false,
      });
    } else if (title === 'Use phone or email') {
      updateFormState({
        isDefaultForm: false,
        isUseEmailForm: true,
      });
    }
  };

  const handleForgotForm = () => {
    updateFormState({
      forgotPassword: !formState.forgotPassword,
      isUseForm: false,
    });
  };

  return (
    <ModalWrapper setIsClick={setIsClick}>
      {formState.changeForm && <LoginDefault data={currentForm} onItemClick={handleItemClick} onClick={handleForm} />}

      {formState.isUseForm && (
        <LoginUse data={currentForm} title={'Log in'} onClick={handleUseForm} handleForgotPassword={handleForgotForm} />
      )}

      {formState.isUseEmailForm && (
        <SignUpWithPhoneEmail data={currentForm} title={'Sign up'} onClick={handleUseEmailForm} />
      )}

      {formState.forgotPassword && <ResetPasswordLoginForm />}
    </ModalWrapper>
  );
}

Auth.propTypes = {
  setIsClick: PropTypes.func.isRequired,
};

export default Auth;
