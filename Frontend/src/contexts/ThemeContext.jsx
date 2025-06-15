import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    // Default to dark mode
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Only override default if user has explicitly saved a preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme !== null) {
            setIsDark(savedTheme === 'dark');
        }
        // If no saved theme, keep dark as default (don't change isDark)
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', isDark);

        // Update body background to prevent any white flashes
        document.body.style.backgroundColor = isDark
            ? 'rgb(15, 23, 42)' // slate-900
            : 'rgb(249, 250, 251)'; // gray-50

        // Update body class for CSS selectors
        document.body.classList.toggle('dark', isDark);
        document.body.classList.toggle('light', !isDark);
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
