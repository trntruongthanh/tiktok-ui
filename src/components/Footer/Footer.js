import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { useState } from 'react';

import Image from '../Image';
import images from '~/assets/images';
import { FooterIcon } from '../Icons';
import { GlobalContext } from '~/Context/GlobalContext';

const cx = classNames.bind(styles);

function Footer({ tipLogo = images.tipLogo }) {
  const { theme } = useContext(GlobalContext);

  const [visibleSection, setVisibleSection] = useState(null);
  const [isChannelsVisible, setIsChannelsVisible] = useState(false);

  const toggleSection = (section) => {
    setVisibleSection((prev) => (prev === section ? null : section));
  };

  const toggleChannels = () => {
    setIsChannelsVisible((prev) => !prev);
  };

  const renderFooterSection = (title, content) => (
    <div key={title} className={cx('footer-options')}>
      <h4
        onClick={() => toggleSection(title)}
        className={cx('footer-header', {
          light: theme === 'light',
          dark: theme === 'dark',
          [styles.active]: visibleSection === title,
        })}
      >
        {title}
      </h4>

      {visibleSection === title && (
        <React.Fragment>
          {content.map((item, index) => (
            <a
              className={cx({ light: theme === 'light', dark: theme === 'dark' })}
              key={`${title}-${index}`}
              href="/"
              target="blank"
            >
              {item}
            </a>
          ))}
        </React.Fragment>
      )}
    </div>
  );

  const footerSections = [
    {
      title: 'Company',
      content: ['About', 'Newsroom', 'Contact', 'Careers'],
    },
    {
      title: 'Program',
      content: ['TikTok for Good', 'Advertise', 'TikTok LIVE Creator Networks', 'Developers'],
    },
    {
      title: 'Terms & Policies',
      content: [
        'Help',
        'Safety',
        'Terms',
        'Privacy Policy',
        'Privacy Center',
        'Creator Academy',
        'Community Guidelines',
      ],
    },
  ];

  return (
    <div className={cx('footer-wrapper')}>
      <a href="https://effecthouse.tiktok.com/download?utm_source=tiktok_webapp_main" target="blank">
        <div className={cx('footer-container')}>
          <Image src={tipLogo} alt="tip-logo" className={cx('footer-banner')} />
          <div className={cx('footer-title')}>
            <h4>Create TikTok effects, get a reward</h4>
          </div>
        </div>
      </a>

      <div className={cx('footer-info')}>
        {footerSections.map((section) => renderFooterSection(section.title, section.content))}
      </div>

      <div
        onClick={toggleChannels}
        className={cx(
          'see-more',
          { light: theme === 'light', dark: theme === 'dark' },
          { [styles.hide]: isChannelsVisible },
        )}
      >
        See more
        <FooterIcon className={cx('footer-icon')} />
      </div>

      <div className={cx('footer-options')}>
        {isChannelsVisible && (
          <React.Fragment>
            <h4
              onClick={(e) => e.preventDefault()}
              className={cx('footer-header', { light: theme === 'light', dark: theme === 'dark' })}
            >
              Channels
            </h4>
            {[
              'Dance',
              'Arts',
              'Food and Drink',
              'Tourism',
              'Production and Manufacturing',
              'Vehicles and Transportation',
              'Relationship',
              'TikTok Style',
            ].map((item, index) => (
              <a
                className={cx({ light: theme === 'light', dark: theme === 'dark' })}
                key={`channel-${index}`}
                href="/"
                target="blank"
              >
                {item}
              </a>
            ))}
          </React.Fragment>
        )}
      </div>

      <div className={cx('copyright-wrapper')}>
        <span className={cx('footer-copyright', { light: theme === 'light', dark: theme === 'dark' })}>
          © 2024 TikTok
        </span>
      </div>
    </div>
  );
}

Footer.propTypes = {
  tipLogo: PropTypes.string,
};

export default Footer;
