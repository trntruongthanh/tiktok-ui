import React, { useState, useEffect, useRef, useContext } from 'react';

import classNames from 'classnames/bind'; // npm i classnames
import styles from './Search.module.scss';
import './Search.module.scss';

import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

import AccountItem from '~/components/AccountItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';

import * as searchService from '~/services/searchService';
import { GlobalContext } from '~/Context/GlobalContext';

const cx = classNames.bind(styles);

function Search() {
  const { theme } = useContext(GlobalContext);

  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState(''); // chuc nang la clear
  const [showResult, setShowResult] = useState(false);

  const [loading, setLoading] = useState(false); // xu ly loading

  const debouncedValue = useDebounce(searchValue, 500);

  const inputRef = useRef();

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);

      const result = await searchService.search(debouncedValue);
      setSearchResult(result);

      setLoading(false);
    };

    fetchApi();
  }, [debouncedValue]);

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value.trimStart());
  };

  return (
    //Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
    <div>
      <HeadlessTippy
        interactive={true}
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx('search-title')}>Accounts</h4>
              {searchResult.map((result) => (
                <AccountItem key={result.id} data={result} />
              ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx('search', { light: theme === 'light', dark: theme === 'dark' })}>
          <input
            className={cx('input-search', { light: theme === 'light', dark: theme === 'dark' })}
            ref={inputRef}
            value={searchValue}
            placeholder="Search"
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />

          {!!searchValue && !loading && (
            <button className={cx('clear', { light: theme === 'light', dark: theme === 'dark' })} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}

          {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

          <button
            className={cx('search-btn', { light: theme === 'light', dark: theme === 'dark' })}
            onMouseDown={(event) => event.preventDefault()}
          >
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
