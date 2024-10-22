import classNames from 'classnames/bind';
import Video from './Video/Video';
import styles from './VideoItem.module.scss';
import { useContext } from 'react';
import { GlobalContext } from '~/Context/GlobalContext';

const cx = classNames.bind(styles);

function VideoItem({ data = [] }) {
  const { theme } = useContext(GlobalContext);

  return (
    <div className={cx('wrapper', { light: theme === 'light', dark: theme === 'dark' })}>
      {data.map((item) => (
        <Video key={item.id} data={item} src={item.file_url} />
      ))}
    </div>
  );
}

VideoItem.propTypes = {};

export default VideoItem;
