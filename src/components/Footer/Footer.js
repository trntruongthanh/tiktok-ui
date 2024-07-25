import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { useState } from 'react';

import Image from '../Image';
import { FooterIcon } from '../Icons';

const cx = classNames.bind(styles);

function Footer() {
  const [isCompanyVisible, setIsCompanyVisible] = useState(false);
  const [isProgramVisible, setIsProgramVisible] = useState(false);
  const [isTermVisible, setIsTermVisible] = useState(false);
  const [isChannels, setIsChannels] = useState(false);

  const toggleCompany = () => {
    setIsCompanyVisible((prev) => !prev);
    setIsProgramVisible(false);
    setIsTermVisible(false);
  };

  const toggleProgram = () => {
    setIsProgramVisible((prev) => !prev);
    setIsCompanyVisible(false);
    setIsTermVisible(false);
  };

  const toggleTerm = () => {
    setIsTermVisible((prev) => !prev);
    setIsCompanyVisible(false);
    setIsProgramVisible(false);
  };

  const toggleChannels = () => {
    setIsChannels((prev) => !prev);
  };

  return (
    // footer banner
    <div className={cx('footer-wrapper')}>
      <a href="https://effecthouse.tiktok.com/download?utm_source=tiktok_webapp_main" target="blank">
        <div className={cx('footer-container')}>
          <Image
            src="https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop/8152caf0c8e8bc67ae0d.png"
            alt=""
            className={cx('footer-banner')}
          />

          <div className={cx('footer-title')}>
            <h4>Create TikTok effects, get a reward</h4>
          </div>
        </div>
      </a>

      {/* footer info */}
      <div className={cx('footer-info')}>
        <div className={cx('footer-options')}>
          <h4 onClick={toggleCompany} className={cx('footer-header', { [styles['active']]: isCompanyVisible })}>
            Company
          </h4>

          {isCompanyVisible && (
            <React.Fragment>
              <a href="/" target="blank">
                About
              </a>
              <a href="/" target="blank">
                Newsroom
              </a>
              <a href="/" target="blank">
                Contact
              </a>
              <a href="/" target="blank">
                Careers
              </a>
            </React.Fragment>
          )}
        </div>

        <div className={cx('footer-options')}>
          <h4 onClick={toggleProgram} className={cx('footer-header', { [styles.active]: isProgramVisible })}>
            Program
          </h4>
          {isProgramVisible && (
            <React.Fragment>
              <a href="/" target="blank">
                TikTok for Good
              </a>
              <a href="/" target="blank">
                Advertise
              </a>
              <a href="/" target="blank">
                TikTok LIVE Creator Networks
              </a>
              <a href="/" target="blank">
                Developers
              </a>
            </React.Fragment>
          )}
        </div>

        <div className={cx('footer-options')}>
          <h4 onClick={toggleTerm} className={cx('footer-header', { [styles.active]: isTermVisible })}>
            Terms & Policies
          </h4>
          {isTermVisible && (
            <React.Fragment>
              <a href="/" target="blank">
                Help
              </a>
              <a href="/" target="blank">
                Safety
              </a>
              <a href="/" target="blank">
                Terms
              </a>
              <a href="/" target="blank">
                Privacy Policy
              </a>
              <a href="/" target="blank">
                Privacy Center
              </a>
              <a href="/" target="blank">
                Creator Academy
              </a>
              <a href="/" target="blank">
                Community Guidelines
              </a>
            </React.Fragment>
          )}
        </div>
      </div>

      {/* see all */}
      <div onClick={toggleChannels} className={cx('see-more', { [styles.hide]: isChannels })}>
        See more
        {<FooterIcon className={cx('footer-icon')} />}
      </div>

      <div className={cx('footer-options')}>
        {isChannels && (
          <React.Fragment>
            <h4 onClick={(e) => e.preventDefault()} className={cx('footer-header')}>
              Channels
            </h4>
            <a href="/" target="blank">
              Dance
            </a>
            <a href="/" target="blank">
              Arts
            </a>
            <a href="/" target="blank">
              Food and Drink
            </a>
            <a href="/" target="blank">
              Tourism
            </a>
            <a href="/" target="blank">
              Production and Manufacturing
            </a>{' '}
            <a href="/" target="blank">
              Vehicles and Transportation
            </a>{' '}
            <a href="/" target="blank">
              Relationship
            </a>{' '}
            <a href="/" target="blank">
              TikTok Style
            </a>
          </React.Fragment>
        )}
      </div>

      <span className={cx('footer-copyright')}>
      © 2024 TikTok
      </span>
      
    </div>
  );
}

Footer.propTypes = {};

export default Footer;
