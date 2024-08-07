import {
  QrIcon,
  FacebookIcon,
  UserIcon,
  GoogleIcon,
  TwitterIcon,
  LineIcon,
  KakaoTalkIcon,
  AppleIcon,
} from '~/components/Icons/AuthIcons';

const loginModalData = {
  title: 'Log in to TikTok',
  data: [
    {
      title: 'Use QR code',
      icon: <QrIcon />,
    },
    {
      title: 'Use phone / email / username',
      icon: <UserIcon />,
    },
    {
      title: 'Continue with Facebook',
      icon: <FacebookIcon />,
    },
    {
      title: 'Continue with Google',
      icon: <GoogleIcon />,
    },
    {
      title: 'Continue with Twitter',
      icon: <TwitterIcon />,
    },
    {
      title: 'Continue with Line',
      icon: <LineIcon />,
    },
    {
      title: 'Continue with KakaoTalk',
      icon: <KakaoTalkIcon />,
    },
    {
      title: 'Continue with Apple',
      icon: <AppleIcon />,
    },
  ],
  footer: {
    title: "Don't have an account?",
    linkText: 'Sign up',
  },
};

const signupModalData = {
  title: 'Sign up for TikTok',
  data: [
    {
      title: 'Use phone or email',
      icon: <UserIcon />,
      type: 'use-phone-email-username',
    },
    {
      title: 'Continue with Facebook',
      icon: <FacebookIcon />,
    },
    {
      title: 'Continue with Google',
      icon: <GoogleIcon />,
    },
    {
      title: 'Continue with Line',
      icon: <LineIcon />,
    },
    {
      title: 'Continue with KakaoTalk',
      icon: <KakaoTalkIcon />,
    },
  ],
  footer: {
    title: 'Already have an account?',
    linkText: 'Log in',
  },
};

export { loginModalData, signupModalData };
