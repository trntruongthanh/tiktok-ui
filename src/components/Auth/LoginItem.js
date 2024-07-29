import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Form/LoginDefault/LoginDefault.module.scss';

import Button from '../Button';

const cx = classNames.bind(styles);

function LoginItem({ data, className, onClick }) {

    const classes = cx('menu-item', className)

  return (
    <Button onClick={() => onClick(data.title)} className={classes} leftIcon={data.icon} large text >
      {data.title}
    </Button>
  );
}

LoginItem.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.string,
  onClick: PropTypes.func,
}

export default LoginItem;
