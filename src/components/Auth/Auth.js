import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import { useState } from 'react';

import ModalWrapper from '../ModalWrapper';

import { loginModalData, signupModalData } from '~/temp/data/modals/loginModal';

import LoginDefault from './Form/LoginDefault/LoginDefault';
import LoginUse from './Form/LoginUse/LoginUse';

const cx = classNames.bind(styles);

function Auth({ setIsClick }) {
  const [isDefaultForm, setIsDefaultForm] = useState(true);
  const [isUseForm, setIsUseForm] = useState(false);

  const [changeForm, setChangeForm] = useState(true);

  const currentForm = isDefaultForm ? loginModalData : signupModalData;

  const handleForm = () => {
    setIsDefaultForm(!isDefaultForm);
  };

  const handleUseForm = () => {
    setIsUseForm(false);
    setIsDefaultForm(false);
    setChangeForm(true);
  };

  const handleItemClick = (title) => {
    if (title === 'Use phone / email / username' || 'Use phone or email') {
      setIsUseForm(true);
      setIsDefaultForm(true);
      setChangeForm(false);
    }
  };

  return (
    <ModalWrapper setIsClick={setIsClick}>
      {changeForm && <LoginDefault data={currentForm} onItemClick={handleItemClick} onClick={handleForm} />}
      {isUseForm && <LoginUse data={currentForm} title={'Log in'} onClick={handleUseForm} />}
    </ModalWrapper>
  );
}

Auth.propTypes = {
  setIsClick: PropTypes.func,
};

export default Auth;
