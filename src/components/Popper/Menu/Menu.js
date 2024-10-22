import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import MenuItem from './MenuItem';
import Header from './Header';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useContext, useState } from 'react';

import { GlobalContext } from '~/Context/GlobalContext';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn}) {

  const { theme } = useContext(GlobalContext)

  const [history, setHistory] = useState([{ data: items }]);

  const current = history[history.length - 1];

  const [selectedMode, setSelectedMode] = useState('Auto'); // Add state for selected mode

  const handleMenuChangeTick = (MenuItem) => {

    // Kiểm tra nếu mục được chọn là Auto, Dark mode hoặc Light mode trong children
    if (['Auto', 'Dark mode', 'Light mode'].includes(MenuItem.title) && MenuItem.isChild) {

      setSelectedMode(MenuItem.title); // Cập nhật lựa chọn nếu mục thuộc children
    }
    
    onChange(MenuItem); // Gọi hàm onChange nếu có
  };

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;

      const handleClick = () => {
        if (isParent) {
          setHistory((prev) => [...prev, item.children]);
        } else {
          handleMenuChangeTick(item); // Update selected mode
        }
      };

      return (
        <MenuItem
          key={index}
          data={item}
          onClick={handleClick}
          isSelected={selectedMode === item.title && item.isChild}
        />
      );
    });
  };

  const handleBack = () => {
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  const renderResult = (attrs) => (
    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
      <PopperWrapper className={cx('menu-popper', { light: theme === 'light', dark: theme === 'dark' })}>
        {history.length > 1 && <Header title={current.title} onBack={handleBack} theme={theme} />}
        <div className={cx('menu-body')}>{renderItems()}</div>
      </PopperWrapper>
    </div>
  );

  // reset to first page
  const handleResetMenu = () => {
    setHistory((prev) => prev.slice(0, 1));
  };

  return (
    <Tippy
      delay={[0, 600]}
      interactive
      placement="bottom-end"
      offset={[14, 10]}
      render={renderResult}
      onHide={handleResetMenu}
      hideOnClick={hideOnClick}
    >
      {children}
    </Tippy>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  item: PropTypes.array,
  hideOnClick: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Menu;
