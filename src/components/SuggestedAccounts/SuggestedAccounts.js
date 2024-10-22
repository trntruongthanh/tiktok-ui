import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './SuggestedAccounts.module.scss';

import { useContext } from 'react';
import { GlobalContext } from '~/Context/GlobalContext';

import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label, data = [], onClick, seeAll }) {
  const { theme } = useContext(GlobalContext);

  // useEffect(() => {
  //   console.log('SuggestedAccounts seeAll:', seeAll); // Debugging line
  // }, [seeAll]);

  return (
    <div className={cx('wrapper', { light: theme === 'light', dark: theme === 'dark' })}>
      <p className={cx('label', { light: theme === 'light', dark: theme === 'dark' })}>{label}</p>

      {data.map((account, index) => (
        <AccountItem key={index} data={account} />
      ))}

      <p className={cx('more-btn')} onClick={onClick}>
        {seeAll ? 'see less' : 'see more'}
      </p>
    </div>
  );
}

SuggestedAccounts.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.array,
};

export default SuggestedAccounts;
