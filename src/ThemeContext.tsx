import React, { createContext, useState, useContext } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

interface ThemeContextProps {
    theme: ColorSchemeName;
    setTheme: React.Dispatch<React.SetStateAction<ColorSchemeName>>;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light',
    setTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = useState<ColorSchemeName>(
        Appearance.getColorScheme() || 'light',
    );

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
