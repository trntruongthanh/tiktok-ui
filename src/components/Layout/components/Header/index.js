import React from 'react';
import classNames from 'classnames/bind'; // npm i classnames
import styles from './Header.module.scss';

import { Link } from 'react-router-dom';
import routesConfig from '~/config/routes';

import {
  faCoins,
  faEarthAfrica,
  faEllipsisVertical,
  faGear,
  faKeyboard,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faQuestionCircle, faUser } from '@fortawesome/free-regular-svg-icons';

import images from '~/assets/images';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';

import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';

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
  const currentUser = true;

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
  ];

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
      
        <Link to={routesConfig.home} className={cx('logo-link')}>
          <img src={images.logo} alt="TikTok"></img>
        </Link>

        <Search />

        <div className={cx('actions')}>
          {currentUser ? (
            <React.Fragment>
              <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                <button className={cx('action-btn')}>
                  <UploadIcon />
                </button>
              </Tippy>

              <Tippy delay={[0, 50]} content="Message" placement="bottom">
                <button className={cx('action-btn')}>
                  <MessageIcon />
                </button>
              </Tippy>

              <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                <button className={cx('action-btn')}>
                  <InboxIcon />
                  <span className={cx('badge')}>12</span>
                </button>
              </Tippy>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button text>Upload</Button>
              <Button primary>Log in</Button>
            </React.Fragment>
          )}

          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <Image
                className={cx('user-avatar')}
                src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/7125441198252097562~c5_100x100.jpeg?lk3s=a5d48078&nonce=20264&refresh_token=57280c9235922f7f8e6c0f955e84af1b&x-expires=1718326800&x-signature=edlNkdARwIQOIYW9J4h85OAWGeU%3D&shp=a5d48078&shcp=81f88b70"
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
