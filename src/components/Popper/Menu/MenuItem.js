import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import Button from '~/components/Button';
import { TickIcon } from '~/components/Icons';
import { useContext } from 'react';
import { GlobalContext } from '~/Context/GlobalContext';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick, isSelected }) {
  const { theme } = useContext(GlobalContext);

  const classes = cx('menu-item', {
    light: theme === 'light',
    dark: theme === 'dark',
    separate: data.separate,
  });

  return (
    <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
      {isSelected && data.isChild && <TickIcon className={cx('tick-icon')} />} {/* Show TickIcon if selected */}
      {data.title}
    </Button>
  );
}

MenuItem.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default MenuItem;
