import classNames from 'classnames/bind';
import { useState } from 'react';

import {
  ArrowBottomIcon,
  CopyLinkIcon,
  EmailIcon,
  EmbedIcon,
  LineIcon,
  LinkedInIcon,
  PinterestIcon,
  RedditIcon,
  RepostIcon,
  SendToFriendsIcon,
  ShareToFacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsAppIcon,
} from '~/components/Icons';
import styles from './SharePreview.module.scss';

const cx = classNames.bind(styles);

const shareOptions = [
  { icon: RepostIcon, text: 'Repost' },
  { icon: EmbedIcon, text: 'Embed' },
  { icon: SendToFriendsIcon, text: 'Send to friends' },
  { icon: ShareToFacebookIcon, text: 'Share to Facebook' },
  { icon: CopyLinkIcon, text: 'Copy link' },
];

const shareOptionsMore = [
  ...shareOptions,
  { icon: WhatsAppIcon, text: 'Share to WhatsApp' },
  { icon: TwitterIcon, text: 'Share to Twitter' },
  { icon: LinkedInIcon, text: 'Share to LinkedIn' },
  { icon: RedditIcon, text: 'Share to Reddit' },
  { icon: TelegramIcon, text: 'Share to Telegram' },
  { icon: EmailIcon, text: 'Share to Email' },
  { icon: LineIcon, text: 'Share to Line' },
  { icon: PinterestIcon, text: 'Share to Pinterest' },
];

function SharePreview({ isMoreShareOption, handleMoreShareOption }) {
  const options = isMoreShareOption ? shareOptionsMore : shareOptions;

  return (
    <div className={cx('wrapper')}>
      {options.map(({ icon: Icon, text }) => (
        <a onClick={(e) => e.preventDefault()} key={text} className={cx('share-preview')} href="/">
          <span className={cx('preview-icon')}>
            <Icon />
          </span>
          <span className={cx('preview-text')}>{text}</span>
        </a>
      ))}

      {!isMoreShareOption && (
        <a onClick={handleMoreShareOption} className={cx('more-share-option')} href="/">
          <ArrowBottomIcon />
        </a>
      )}
    </div>
  );
}

SharePreview.propTypes = {};

export default SharePreview;
