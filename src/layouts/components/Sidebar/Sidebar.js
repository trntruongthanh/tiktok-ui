import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import {
  HomeIcon,
  HomeActiveIcon,
  UserGroupIcon,
  UserGroupActiveIcon,
  LiveIcon,
  LiveActiveIcon,
  ProfileIcon,
  ExploreIcon,
  ExploreActiveIcon,
  FriendIcon,
  FriendActiveIcon,
} from '~/components/Icons';

import config from '~/config';
import Menu, { MenuItem } from './Menu';
import Image from '~/components/Image';
import SuggestedAccounts from '~/components/SuggestedAccounts';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />

        <MenuItem
          title="Explore"
          to={config.routes.explore}
          icon={<ExploreIcon />}
          activeIcon={<ExploreActiveIcon />}
        />

        <MenuItem
          title="Following"
          to={config.routes.following}
          icon={<UserGroupIcon className={cx('icon-user-group')} />}
          activeIcon={<UserGroupActiveIcon className={cx('icon-user-group')} />}
        />

        <MenuItem title="Friends" to={config.routes.friends} icon={<FriendIcon />} activeIcon={<FriendActiveIcon />} />

        <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />

        <MenuItem
          title="Profile"
          to={config.routes.profile}
          icon={<ProfileIcon />}
          activeIcon={
            <Image
              className={cx('user-avatar')}
              alt="Thanh Tran"
              src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/7125441198252097562~c5_100x100.jpeg?lk3s=a5d48078&nonce=16195&refresh_token=58587620c427894c6f42c10304446972&x-expires=1719550800&x-signature=%2BFNKmFfQAKTytWLw6hRqstJHUTA%3D&shp=a5d48078&shcp=81f88b70"
            />
          }
        />
      </Menu>

      <SuggestedAccounts label="Suggested accounts" />
      
      {/* <SuggestedAccounts label="Following accounts" /> */}
    </aside>
  );
}

export default Sidebar;
