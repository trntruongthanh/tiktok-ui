import classNames from 'classnames/bind'; // npm i classnames
import styles from './Header.module.scss';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faSpinner,
  faMagnifyingGlass,
  faEllipsisVertical,
  faEarthAfrica,
  faKeyboard,
  faCloudArrowUp,
  faRightFromBracket,
  faGear,
  faCoins,
} from '@fortawesome/free-solid-svg-icons';

import { faMessage, faQuestionCircle, faUser } from '@fortawesome/free-regular-svg-icons';

import images from '~/assets/images';

import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import { Wrapper as PopperWrapper } from '~/components/Popper';

import { useEffect, useState } from 'react';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles); // để có thể sử dụng className={cx('post-item)}

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAfrica} />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          code: 'en',
          title: 'English',
        },
        {
          code: 'vi',
          title: 'Tiếng Việt',
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faQuestionCircle} />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shortcuts',
  },
];

function Header() {
  const [searchResult, setSearchResult] = useState([]);

  const currentUser = true;

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([]);
    }, 0);
  }, []);

  const handleMenuChange = (MenuItem) => {
    // console.log(MenuItem);
  };

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
      to: '/@thanhtran',
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: 'Get coin',
      to: '/coin',
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Settings',
      to: '/settings',
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      title: 'Log out',
      to: '/logout',
      separate: true,
    },
  ]


  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <img src={images.logo} alt="TikTok"></img>

        <HeadlessTippy
          interactive={true}
          visible={searchResult.length > 0}
          render={(attrs) => (
            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <h4 className={cx('search-title')}>Accounts</h4>

                <AccountItem />
                <AccountItem />
                <AccountItem />
              </PopperWrapper>
            </div>
          )}
        >
          <div className={cx('search')}>
            <input placeholder="Search" spellCheck={false} />

            <button className={cx('clear')}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>

            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

            <button className={cx('search-btn')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </HeadlessTippy>

        <div className={cx('actions')}>
          {currentUser ? (
            <React.Fragment>
              <Tippy delay={[0, 200]} content="Upload video" placement="bottom">
                <button className={cx('action-btn')}>
                  <FontAwesomeIcon icon={faCloudArrowUp} />
                </button>
              </Tippy>

              <button className={cx('action-btn')}>
                <FontAwesomeIcon icon={faMessage} />
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button text>Upload</Button>
              <Button primary>Log in</Button>
            </React.Fragment>
          )}

          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <img
                className={cx('user-avatar')}
                src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/7125441198252097562~c5_100x100.jpeg?lk3s=a5d48078&nonce=12065&refresh_token=ae5e4199385d0f2f8a8657cd3ef41c71&x-expires=1717657200&x-signature=uuTsGp3Hu2sGRjFYyA%2FS1kKRFuU%3D&shp=a5d48078&shcp=81f88b70"
                alt="Thanh Tran"
              />
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
