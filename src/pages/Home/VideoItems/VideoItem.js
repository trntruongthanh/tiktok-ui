import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './VideoItem.module.scss';
import Video from './Video/Video';

const cx = classNames.bind(styles);

function VideoItem({ data = [] }) {
  return (
    <div className={cx('wrapper')}>
      {data.map((item) => (
        <Video key={item.id} data={item} src={item.file_url} />
      ))}
    </div>
  );
}

VideoItem.propTypes = {};

export default VideoItem;
