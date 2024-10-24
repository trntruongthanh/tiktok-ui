import classNames from 'classnames/bind'; // npm i classnames
import React, { useContext } from 'react';
import styles from './Header.module.scss';

import { GlobalContext } from '~/Context/GlobalContext';

import { Link } from 'react-router-dom';
import config from '~/config';

import { faCoins, faEllipsisVertical, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUser } from '@fortawesome/free-regular-svg-icons';

import images from '~/assets/images';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';


import {
  CreatorIcon,
  DarkModeIcon,
  EnglishIcon,
  FeedBackIcon,
  InboxIcon,
  MessageIcon,
  UploadIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';

const cx = classNames.bind(styles); // để có thể sử dụng className={cx('post-item)}

const MENU_ITEMS = [
  {
    icon: <CreatorIcon />,
    title: 'Creator tools',
  },
  {
    icon: <EnglishIcon />,
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
    icon: <FeedBackIcon />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <DarkModeIcon />,
    title: 'Dark mode',
    children: {
      title: 'Dark mode',
      data: [
        {
          title: 'Auto',
          isChild: true,
        },
        {
          title: 'Dark mode',
          isChild: true,
        },
        {
          title: 'Light mode',
          isChild: true,
        },
      ],
    },
  },
];

function Header({ onClick }) {

  const { theme, handleMenuChange } = useContext(GlobalContext);

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

  const currentUser = false;

  return (
    <header className={cx('wrapper', { light: theme === 'light', dark: theme === 'dark' })}>
      <div className={cx('inner')}>
        <Link to={config.routes.home} className={cx('logo-link')}>
          <img className={cx('logo')} src={theme === 'light' ? images.logo : images.logoWhite} alt="TikTok"></img>
        </Link>

        <Search />

        <div className={cx('actions')}>
          {currentUser ? (
            <React.Fragment>
              <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                <button className={cx('action-btn', { light: theme === 'light', dark: theme === 'dark' })}>
                  <UploadIcon />
                </button>
              </Tippy>

              <Tippy delay={[0, 50]} content="Message" placement="bottom">
                <button className={cx('action-btn', { light: theme === 'light', dark: theme === 'dark' })}>
                  <MessageIcon />
                </button>
              </Tippy>

              <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                <button className={cx('action-btn', { light: theme === 'light', dark: theme === 'dark' })}>
                  <InboxIcon />
                  <span className={cx('badge')}>12</span>
                </button>
              </Tippy>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button
                className={cx('btn-upload', { light: theme === 'light', dark: theme === 'dark' })}
                text
                onClick={onClick}
              >
                Upload
              </Button>
              <Button primary onClick={onClick}>
                Log in
              </Button>
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
              <button className={cx('more-btn', { light: theme === 'light', dark: theme === 'dark' })}>
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
