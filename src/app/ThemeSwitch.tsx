'use client';
import { DarkIcon, LightIcon } from '@/components/icons';
import { useTheme } from 'next-themes';

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const handleClickChange = () => {
    if ('light' === theme) {
      setTheme('dark');
      return;
    }
    setTheme('light');
  };

  return (
    <div
      onClick={handleClickChange}
      className="relative flex items-center justify-center w-12 h-6 bg-teal-500 dark:bg-slate-500 cursor-pointer rounded-full p-1"
    >
      <span className="absolute left-1 w-4 h-4 bg-white dark:bg-black transition-dark-mode delay-[25ms] dark:translate-x-6 rounded-full cursor-pointer">
        <span className="relative block overflow-hidden w-4 h-4 rounded-full">
          {'light' === theme ? (
            <LightIcon className="w-4 absolute left-0 text-black" />
          ) : (
            <DarkIcon className="w-4 absolute left-0 text-while" />
          )}
        </span>
      </span>
      {/* <button onClick={() => setTheme('light')}>Light Mode</button> */}
      {/* <button onClick={() => setTheme('dark')}>Dark Mode</button> */}
    </div>
  );
};

export default ThemeSwitch;
