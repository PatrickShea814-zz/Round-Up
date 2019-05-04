import useDarkMode from 'use-dark-mode';

const ClownModeStatus = () => {
  const { value } = useDarkMode(false);

  return value ? 'Dark Mode' : 'Light Mode';
};

export default ClownModeStatus;
