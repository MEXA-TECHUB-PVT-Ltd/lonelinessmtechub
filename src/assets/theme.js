import palette from "./palette";

const lightTheme = {
    background: palette.white,
    text: palette.black,
    primary: palette.primary,
    secondary: palette.secondary,
};

const darkTheme = {
    background: palette.primary,
    text: palette.dimGray,
    inputBackground: palette.darkGray,
    primary: palette.primary,
    secondary: palette.secondary,
    white: palette.white,
    black: palette.black,
    buttonText: palette.almostBlack,
    transparentBg: palette.transparent,
    inputBg: palette.grayDark,
    inputLabel: palette.gray,
    error: palette.danger,
    heading: palette.gray
};

export default {
    light: lightTheme,
    dark: darkTheme,
};