import { createContext, useState } from 'react';

const GlobalContext = createContext();

function GlobalProvider({ children }) {

  // Theme
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // feature theme mode
  const toggleTheme = (newTheme) => {
    const currentTheme = theme; // Lấy giá trị hiện tại

    document.body.classList.remove(currentTheme); // Xóa class hiện tại

    setTheme(newTheme); // Cập nhật theme mới

    document.body.classList.add(newTheme); // Thêm class mới

    localStorage.setItem('theme', newTheme); // Lưu vào localStorage
  };

  const handleMenuChange = (MenuItem) => {
    if (MenuItem.isChild && MenuItem.title === 'Dark mode') {
      toggleTheme('dark');
    } else if (MenuItem.isChild && MenuItem.title === 'Light mode') {
      toggleTheme('light');
    }
  };

  const value = {
    theme,
    handleMenuChange,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}

export { GlobalProvider, GlobalContext };
