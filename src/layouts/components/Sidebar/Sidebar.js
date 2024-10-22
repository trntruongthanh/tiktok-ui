import { useContext, useEffect, useState } from 'react';
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
import * as suggestService from '~/services/suggestService';

import Image from '~/components/Image';

import Menu, { MenuItem } from './Menu';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import LoginTip from '~/components/LoginTip';
import Footer from '~/components/Footer';
import { GlobalContext } from '~/Context/GlobalContext';

const cx = classNames.bind(styles);

const INIT_PAGE = 5;
const PER_PAGE = 5;
const MAX_PAGE = 10;

function Sidebar({ onClick }) {
  const { theme } = useContext(GlobalContext);

  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const [page, setPage] = useState(INIT_PAGE);
  const [seeAll, setSeeAll] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await suggestService.suggest(page, PER_PAGE);
        setSuggestedUsers((prevUsers) => [...prevUsers, ...result]);
      } catch (error) {
        console.error('Failed to fetch suggested users', error);
      }

      if (page * PER_PAGE >= MAX_PAGE) {
        setSeeAll(true);
      }
    };

    fetchApi();
  }, [page]);

  const handleSeeAll = () => {
    if (suggestedUsers.length >= MAX_PAGE) {
      setSeeAll((prevShowAll) => !prevShowAll);

      setSuggestedUsers((prevUsers) => [...prevUsers.slice(0, PER_PAGE)]);
    } else {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // useEffect(() => {
  //   console.log('seeAll:', seeAll); // Debugging line
  // }, [seeAll]);

  return (
    <aside className={cx('wrapper', { light: theme === 'light', dark: theme === 'dark' })}>
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
            <ProfileIcon />
            // <Image
            //   className={cx('user-avatar')}
            //   alt="Thanh Tran"
            //   src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/7125441198252097562~c5_100x100.jpeg?lk3s=a5d48078&nonce=16195&refresh_token=58587620c427894c6f42c10304446972&x-expires=1719550800&x-signature=%2BFNKmFfQAKTytWLw6hRqstJHUTA%3D&shp=a5d48078&shcp=81f88b70"
            // />
          }
          onClick={onClick}
        />
      </Menu>

      {/* <SuggestedAccounts label="Suggested for you" data={suggestedUsers} onClick={handleSeeAll} seeAll={seeAll} /> */}

      <LoginTip onClick={onClick} />

      <Footer />
    </aside>
  );
}

export default Sidebar;
