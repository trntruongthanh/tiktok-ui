import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import TippyHeadless from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import * as getVideoService from '~/services/loadVideo';

import Button from '~/components/Button';
import VideoItem from './VideoItems/VideoItem';

import GetApp from '~/components/GetApp/GetApp';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const THRESHOLD = 0.7; // Ngưỡng 70%
function Home() {
  const [videoList, setVideoList] = useState([]);

  const [page, setPage] = useState(INIT_PAGE);

  const [tippyVisible, setTippyVisible] = useState(false);

  const handleClose = () => setTippyVisible(false);
  const handleOpen = () => setTippyVisible(true);

  useEffect(() => {
    const fetchVideoList = async () => {
      try {
        const result = await getVideoService.loadVideo('for-you', page);

        setVideoList((prevVideoList) => [...prevVideoList, ...result]);
      } catch (error) {
        console.error('Failed to fetch videos', error);
      }
    };

    fetchVideoList();
  }, [page]);

  useEffect(() => {
    /*

    window.innerHeight: The height of the browser's viewport (visible area).
    document.documentElement.scrollTop: The number of pixels that the document has been scrolled vertically.
    document.documentElement.offsetHeight: The total height of the document.
    
    window.innerHeight = 800; // Viewport height is 800px
    document.documentElement.scrollTop = 1500; // User has scrolled down 1500px
    document.documentElement.offsetHeight = 2300; // Total document height is 2300px

    // Let's calculate the condition
    if (800 + 1500 >= 2300 - 100) {
      // This condition will be true
      // 2300 >= 2200
    }

  */
    const handleScroll = () => {
      const scrollTop = window.innerHeight + document.documentElement.scrollTop;
      const documentHeight = document.documentElement.offsetHeight;

      if (scrollTop >= documentHeight * THRESHOLD) {
        if (videoList.length % 15 === 0 && videoList.length > 0) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [videoList.length]);

  const renderGetApp = (props) => (
    <div tabIndex="-1" {...props}>
      <PopperWrapper>{tippyVisible && <GetApp handleClose={handleClose} />}</PopperWrapper>
    </div>
  );

  return (
    <div className={cx('wrapper')}>
      <div className={cx('video-wrapper')}>
        <VideoItem data={videoList} />
      </div>

      <TippyHeadless
        interactive
        offset={[-100, 10]}
        delay={[0, 0]}
        render={renderGetApp}
        visible={tippyVisible}
        onClickOutside={handleClose}
      >
        <div onClick={handleOpen} className={cx('bottom-container')}>
          <div className={cx('get-app-bottom')}>
            <Button className={cx('get-app')} small text outline>
              Get app
            </Button>
          </div>
        </div>
      </TippyHeadless>
    </div>
  );
}

Home.propTypes = {};

export default Home;
