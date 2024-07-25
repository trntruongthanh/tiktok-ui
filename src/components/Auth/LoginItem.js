import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Form/LoginDefault/LoginDefault.module.scss';

import Button from '../Button';

const cx = classNames.bind(styles);

function LoginItem({ data, className }) {

    const classes = cx('menu-item', className)

  return (
    <Button className={classes} leftIcon={data.icon} large text >
      {data.title}
    </Button>
  );
}

export default LoginItem;
