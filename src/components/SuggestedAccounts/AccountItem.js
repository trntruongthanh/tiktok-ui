import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';

import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);

function AccountItem() {
  const renderPreview = (props) => {
    return (
      <div tabIndex="1" {...props}>
        <PopperWrapper>
          <AccountPreview />
        </PopperWrapper>
      </div>
    );
  };

  return (
    <div>
      <Tippy interactive delay={[1000, 0]} offset={[-10, 0]} placement="bottom" render={renderPreview}>
        <div className={cx('account-item')}>
          <img
            className={cx('avatar')}
            src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/7125441198252097562~c5_100x100.jpeg?lk3s=a5d48078&nonce=37366&refresh_token=7f9f72aac9b5cbbff9c77eb25653abdf&x-expires=1720098000&x-signature=XKd7UoHDe4EieLahZFXeiqE7Ro4%3D&shp=a5d48078&shcp=81f88b70"
            alt=""
          />
          <div className={cx('item-info')}>
            <p className={cx('nickname')}>
              <strong>trntruongthanh</strong>
              <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
            </p>
            <p className={cx('name')}>Tran Truong Thanh</p>
          </div>
        </div>
      </Tippy>
    </div>
  );
}

AccountItem.propTypes = {};

export default AccountItem;
