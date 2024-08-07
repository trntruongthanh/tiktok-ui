import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function MenuItem({ onClick, title, to, icon, activeIcon }) {
  return (
    <NavLink onClick={onClick} className={(nav) => cx('menu-item', { active: nav.isActive })} to={to}>
      {({ isActive }) => (
        <>
          {isActive ? activeIcon : icon}
          <span className={cx('title')}>{title}</span>
        </>
      )}
    </NavLink>
  );
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  activeIcon: PropTypes.node.isRequired,
};

export default MenuItem;
