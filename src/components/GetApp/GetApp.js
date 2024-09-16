import classNames from 'classnames/bind';
import styles from './GetApp.module.scss';

import { CloseLoginIcon, ComputerIcon, PhoneIcon } from '../Icons';

const cx = classNames.bind(styles);

function GetApp({ handleClose }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('expand-wrapper')}>
        <div className={cx('item-container')}>
          <ComputerIcon />
          <span className={cx('span-text')}>Get TikTok for desktop</span>

          <div className="close-icon-container">
            <button onClick={handleClose} className={cx('close-container')}>
              <CloseLoginIcon className={cx('close-icon')} />
            </button>
          </div>
        </div>

        <div className={cx('item-container')}>
          <PhoneIcon />
          <span className={cx('span-text')}>Get TikTok App</span>
        </div>
      </div>
    </div>
  );
}

export default GetApp;
