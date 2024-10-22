import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useCallback, useContext, useRef, useState } from 'react';
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
import { GlobalContext } from '~/Context/GlobalContext';

const cx = classNames.bind(styles);

function Video({ src, data }) {
  const videoRef = useRef(null);

  const { theme } = useContext(GlobalContext);
  // const { isGlobalMuted, toggleGlobalMute } = useContext(VideoContext);

  // Combine State Variables:
  const [state, setState] = useState({
    isPlaying: false,

    isMuted: true,
    isVolumeHovering: false, // Để hiển thị thanh kéo âm lượng

    isHovering: false,

    isMoreShareOptions: false,

    volumeRange: 10,

    seekBarValue: 0,
  });

  // handle play and pause

  const toggleMute = () => {
    const newMuteState = !state.isMuted;

    setState((prev) => ({ ...prev, isMuted: newMuteState }));

    // toggleGlobalMute(newMuteState); // Update global mute state
  };

  // const handleVideoClick = () => {
  //   toggleMute(); // Toggle mute on video click
  // };

  const togglePlay = () => {
    if (videoRef.current) {
      if (state.isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
    } else {
      console.error('Video element not found.');
    }
  };

  const handleMouseEnter = () => setState((prev) => ({ ...prev, isHovering: true }));
  const handleMouseLeave = () => setState((prev) => ({ ...prev, isHovering: false }));

  const handleVolumeMouseEnter = () => setState((prev) => ({ ...prev, isVolumeHovering: true }));
  const handleVolumeMouseLeave = () => setState((prev) => ({ ...prev, isVolumeHovering: false }));

  // handle button share
  const handleMoreShareOption = useCallback((e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, isMoreShareOptions: !prev.isMoreShareOptions }));
  }, []);

  // render tippy
  const renderPreview = (props) => {
    return (
      <div tabIndex="-1" {...props}>
        <PopperWrapper>
          <AccountPreview data={data.user} />
        </PopperWrapper>
      </div>
    );
  };

  const renderSharePreview = (props) => {
    return (
      <div tabIndex="-1" {...props}>
        <PopperWrapper className={cx('share-menu', { light: theme === 'light', dark: theme === 'dark' })}>
          <SharePreview isMoreShareOption={state.isMoreShareOptions} handleMoreShareOption={handleMoreShareOption} />
        </PopperWrapper>
      </div>
    );
  };

  // handle volume
  const handleVolume = useCallback((e) => {
    const newValue = e.target.value;

    if (videoRef.current) {
      videoRef.current.volume = newValue / 100;
    }

    setState((prev) => ({ ...prev, volumeRange: newValue }));
  }, []);

  // handle seek bar
  const handleSeekChange = useCallback((e) => {
    const newTime = e.target.value;

    if (videoRef.current) {
      videoRef.current.currentTime = (newTime / 100) * videoRef.current.duration;
    }

    setState((prev) => ({ ...prev, seekBarValue: newTime }));
  }, []);

  const handleTimeUpdate = useCallback((e) => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      const percentage = (currentTime / duration) * 100;

      setState((prev) => ({ ...prev, seekBarValue: percentage }));
    }
  }, []);

  return (
    <div className={cx('video-container')}>
      <div className={cx('video-wrapper')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
          muted={state.isMuted}
          loop
          playsInline
          onLoadedMetadata={() => {
            if (videoRef.current) {
              const options = {
                root: null,
                rootMargin: '-50px',
                threshold: 0.5,
              };

              const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                  if (videoRef.current) {
                    if (entry.isIntersecting) {
                      videoRef.current
                        .play()
                        .then(() => setState((prev) => ({ ...prev, isPlaying: true })))
                        .catch((error) => {
                          console.log('Autoplay prevented. User interaction required.', error);
                          setState((prev) => ({ ...prev, isPlaying: false }));
                        });
                    } else {
                      videoRef.current.pause();
                      setState((prev) => ({ ...prev, isPlaying: false }));
                    }
                  } else {
                    console.error('Video element not found during IntersectionObserver callback.');
                  }
                });
              }, options);
              observer.observe(videoRef.current);

              return () => {
                if (videoRef.current) {
                  observer.unobserve(videoRef.current);
                }
              };
            }
          }}
          onPlay={() => setState((prev) => ({ ...prev, isPlaying: true }))}
          onPause={() => setState((prev) => ({ ...prev, isPlaying: false }))}
          onTimeUpdate={handleTimeUpdate}
        />

        <div className={cx('media-card-bottom', { 'media-card-bottom-hover': state.isHovering })}>
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
              {' '}
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

        {state.isHovering && (
          <div className={cx('slider', 'slider-visible')}>
            <button className={cx('action-icon')} onClick={togglePlay}>
              {state.isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            <div className={cx('seek-bar-container')}>
              <input
                className={cx('seek-bar')}
                type="range"
                step="1"
                min="0"
                max="100"
                value={state.seekBarValue}
                onChange={handleSeekChange}
              />
            </div>

            <Tippy delay={[0, 0]} content="miniplayer" placement="top">
              <button className={cx('action-icon')}>
                <FloatingIcon />
              </button>
            </Tippy>

            <div
              className={cx('volume-wrapper')}
              onMouseEnter={handleVolumeMouseEnter}
              onMouseLeave={handleVolumeMouseLeave}
            >
              {/* Volume range */}
              {state.isVolumeHovering && (
                <div className={cx('volume-container')}>
                  <input
                    className={cx('volume-range')}
                    orient="vertical"
                    type="range"
                    value={state.volumeRange}
                    step="1"
                    min="0"
                    max="100"
                    onChange={handleVolume}
                    id="seekBar"
                  />
                </div>
              )}

              <button className={cx('action-icon')} onClick={toggleMute}>
                {state.isMuted ? <MuteVolumeIcon /> : <UnmuteVolumeIcon />}
              </button>
            </div>
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

        {['likes_count', 'comments_count', 'save'].map((action, index) => (
          <button key={index} className={cx('action-icon-bar', { light: theme === 'light', dark: theme === 'dark' })}>
            <span className={cx('action-icon-span', { light: theme === 'light', dark: theme === 'dark' })}>
              {action === 'likes_count' && <HeartIcon />}
              {action === 'comments_count' && <CommentIcon />}
              {action === 'save' && <SaveIcon />}
            </span>
            <strong className={cx('action-count')}>{data[action]}</strong>
          </button>
        ))}

        <TippyHeadless
          interactive
          delay={[200, 400]}
          offset={[100, 0]}
          placement="top"
          render={renderSharePreview}
          onHidden={() => setState((prev) => ({ ...prev, isMoreShareOptions: false }))}
          appendTo={() => document.body}
        >
          <button className={cx('action-icon-bar', { light: theme === 'light', dark: theme === 'dark' })}>
            <span className={cx('action-icon-span', { light: theme === 'light', dark: theme === 'dark' })}>
              <ShareIcon />
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
