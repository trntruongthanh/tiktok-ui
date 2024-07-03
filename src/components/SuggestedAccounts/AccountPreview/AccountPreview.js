import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function AccountPreview() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <img
          className={cx('avatar')}
          src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/7125441198252097562~c5_100x100.jpeg?lk3s=a5d48078&nonce=37366&refresh_token=7f9f72aac9b5cbbff9c77eb25653abdf&x-expires=1720098000&x-signature=XKd7UoHDe4EieLahZFXeiqE7Ro4%3D&shp=a5d48078&shcp=81f88b70"
          alt=""
        />
        <Button className={cx('follow-btn')} primary>Follow</Button>
      </div>

      <div className={cx('body')}>
        <p className={cx('nickname')}>
          <strong>trntruongthanh</strong>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </p>
        <p className={cx('name')}>Tran Truong Thanh</p>
        <p className={cx('analytics')}>
          <strong className={cx('value')}>8.2M </strong>
          <span className={cx('label')}>Followers</span>

          <strong className={cx('value')}>8.2M </strong>
          <span className={cx('label')}>Likes</span>
        </p>
      </div>
      
    </div>
  );
}

AccountPreview.propTypes = {};

export default AccountPreview;
