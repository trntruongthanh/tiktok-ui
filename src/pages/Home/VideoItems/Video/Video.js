import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { useRef, useState } from 'react';
import styles from './Video.module.scss';

import {
  ButtonContentIcon,
  CommentIcon,
  FloatingIcon,
  HeartIcon,
  MusicIcon,
  MuteVolumeIcon,
  PauseIcon,
  PlayIcon,
  SaveIcon,
  ShareIcon,
  UnmuteVolumeIcon,
} from '~/components/Icons';

import Tippy from '@tippyjs/react';
import TippyHeadless from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import { Wrapper as PopperWrapper } from '~/components/Popper';

import images from '~/assets/images';
import Image from '~/components/Image';
import AccountPreview from '~/components/SuggestedAccounts/AccountPreview';
import SharePreview from './SharePreview/SharePreview';

const cx = classNames.bind(styles);

function Video({ src, data }) {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [isHovering, setIsHovering] = useState(false);
  const [isVolumeHovering, setIsVolumeHovering] = useState(false);

  // Share preview
  const [isMoreShareOption, setIsMoreShareOption] = useState(false);

  const toggleMute = () => {
    setIsMuted((prevState) => !prevState);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const renderPreview = (props) => {
    return (
      <div tabIndex="-1" {...props}>
        <PopperWrapper>
          <AccountPreview data={data.user} />
        </PopperWrapper>
      </div>
    );
  };

  const handleMoreShareOption = (e) => {
    e.preventDefault();
    setIsMoreShareOption((prev) => !prev);
  };

  const renderSharePreview = (props) => {
    return (
      <div tabIndex="-1" {...props}>
        <PopperWrapper>
          <SharePreview isMoreShareOption={isMoreShareOption} handleMoreShareOption={handleMoreShareOption} />
        </PopperWrapper>
      </div>
    );
  };

  return (
    <div className={cx('video-container')}>
      <div
        className={cx('video-wrapper')}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <video
          /*
            root:
              Ý nghĩa: Phần tử chứa mà IntersectionObserver sẽ sử dụng làm khung nhìn. Đây là phần tử mà trong đó bạn muốn theo dõi sự giao nhau của phần tử mục tiêu.
            rootMargin:
              Ý nghĩa: Khoảng cách thêm vào hoặc bớt đi từ khung nhìn của phần tử root. Nó hoạt động giống như thuộc tính margin trong CSS.
           threshold:
              Ý nghĩa: Tỷ lệ phần trăm mà phần tử mục tiêu cần phải giao nhau với khung nhìn để kích hoạt callback.
           */

          className={cx('video')}
          src={src}
          ref={videoRef}
          muted={isMuted}
          loop
          playsInline
          onLoadedMetadata={() => {
            const options = {
              root: null,
              rootMargin: '-50px',
              threshold: 0.5,
            };

            // Designed to observe when an HTML element appears or disappears from the user's viewport.
            const observer = new IntersectionObserver((entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  videoRef.current
                    .play()
                    .then(() => {
                      setIsPlaying(true);
                    })
                    .catch((error) => {
                      // Autoplay was prevented. We need user interaction.
                      console.log('Autoplay prevented. User interaction required.');
                      setIsPlaying(false);
                    });
                } else {
                  videoRef.current.pause();
                  setIsPlaying(false);
                }
              });
            }, options);

            observer.observe(videoRef.current);
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        <div className={cx('media-card-bottom', { 'media-card-bottom-hover': isHovering })}>
          <div className={cx('tag-container')}>
            <div className={cx('tag-content')}>
              <a target="_blank" rel="noopener noreferrer" href="/">
                <Image
                  className={cx('tag-logo')}
                  src={images.capcutLogo}
                  alt="capcut-logo"
                  style={{ width: '1.4rem', height: '1.4rem' }}
                />
                <p className={cx('tag-text')}>CapCut · Try this template</p>
              </a>
            </div>
          </div>

          <div className={cx('author-container')}>
            <a className={cx('author-name')} href="/">
              {data.user?.nickname}
            </a>
          </div>

          <div className={cx('description-container')}>
            <span className={cx('description-text')}>{data.description}</span>
            <a className={cx('description-link')} href="/">
              #capcut #template
            </a>
          </div>

          <div className={cx('music-container')}>
            <h4 className={cx('music-title')}>
              <a onClick={(e) => e.preventDefault()} className={cx('media-card-music')} href="/">
                <MusicIcon className={cx('music-icon')} />
              </a>
              <div className={cx('music-text')}>{data.music}</div>
            </h4>
          </div>
        </div>

        {isHovering && (
          <div className={cx('slider', 'slider-visible')}>
            <button className={cx('action-icon')} onClick={togglePlay}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            <input className={cx('range')} type="range" defaultValue="0" step="1" min="0" max="100" />

            <Tippy delay={[0, 0]} content="miniplayer" placement="top">
              <button className={cx('action-icon')}>
                <FloatingIcon />
              </button>
            </Tippy>

            <button
              className={cx('action-icon')}
              onClick={toggleMute}
              onMouseEnter={() => setIsVolumeHovering(true)}
              onMouseLeave={() => setIsVolumeHovering(false)}
            >
              {isMuted ? <MuteVolumeIcon /> : <UnmuteVolumeIcon />}
            </button>

            {/* Volume range */}
            {isVolumeHovering && (
              <div className={cx('volume-container')}>
                <input className={cx('volume-range')} type="range" min="0" max="100" />
              </div>
            )}
          </div>
        )}
      </div>

      <section className={cx('section-action-bar')}>
        <TippyHeadless
          interactive
          delay={[100, 20]}
          offset={[137, 12]}
          placement="bottom"
          render={renderPreview}
          appendTo={() => document.body}
        >
          <div className={cx('section-avatar-bar')}>
            <a onClick={(e) => e.preventDefault()} className={cx('avatar-bar')} href="/">
              <Image className={cx('avatar')} src={data.user?.avatar} alt={data.user?.nickname} />
            </a>
            <button className={cx('icon-bar-avatar')}>
              <ButtonContentIcon />
            </button>
          </div>
        </TippyHeadless>

        <button className={cx('action-icon-bar')}>
          <span className={cx('action-icon-span')}>
            <HeartIcon className={cx('icon-bar')} />
          </span>
          <strong className={cx('action-count')}>{data.likes_count}</strong>
        </button>

        <button className={cx('action-icon-bar')}>
          <span className={cx('action-icon-span')}>
            <CommentIcon className={cx('icon-bar')} />
          </span>
          <strong className={cx('action-count')}>{data.comments_count}</strong>
        </button>

        <button className={cx('action-icon-bar')}>
          <span className={cx('action-icon-span')}>
            <SaveIcon className={cx('icon-bar')} />
          </span>
          <strong className={cx('action-count')}>199</strong>
        </button>

        <TippyHeadless
          interactive
          delay={[300, 400]}
          offset={[100, 0]}
          placement="top"
          render={renderSharePreview}
          onHidden={() => {
            setIsMoreShareOption(false); // Reset the share options when leaving the tooltip
          }}
          appendTo={() => document.body}
        >
          <button className={cx('action-icon-bar')}>
            <span className={cx('action-icon-span')}>
              <ShareIcon className={cx('icon-bar')} />
            </span>
            <strong className={cx('action-count')}>{data.shares_count}</strong>
          </button>
        </TippyHeadless>
      </section>
    </div>
  );
}

Video.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Video;
