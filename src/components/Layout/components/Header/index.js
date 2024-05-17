import classNames from 'classnames/bind'; // npm i classnames
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);     // để có thể sử dụng className={cx('post-item)}

function Header() {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>

        <div>
          <img src={images.logo} alt='TikTok'></img>
        </div>

        <div className={cx('search')}>
          <input placeholder='Search' spellCheck={false} />

          <button className={cx('clear')}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>

          <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />  

          <button className={cx('search-btn')}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>

        <div className={cx('actions')}>

        </div>

      </div>
    </header>
  );
}

export default Header;
