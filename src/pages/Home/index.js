import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import * as getVideoService from '~/services/loadVideo';

import VideoItem from './VideoItems/VideoItem';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
function Home() {
  const [videoList, setVideoList] = useState([]);

  const [page, setPage] = useState(INIT_PAGE);

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
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
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

  return (
    <div className={cx('wrapper')}>
      <div className={cx('video-wrapper')}>
        <VideoItem data={videoList} />
      </div>
    </div>
  );
}

Home.propTypes = {};

export default Home;
