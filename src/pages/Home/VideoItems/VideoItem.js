import classNames from 'classnames/bind';
import Video from './Video/Video';
import styles from './VideoItem.module.scss';

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
