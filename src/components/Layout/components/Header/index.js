import classNames from 'classnames/bind';           // npm i classnames
import styles from './Header.module.scss';

const cx = classNames.bind(styles);                 // để có thể sử dụng className={cx('post-item)}

function Header() {
  return <header className={cx('wrapper')}>
    <div className={cx('inner')}>
    </div>
  </header>;
}

export default Header;
