import {CHNAGE_THEME, CHECK_THEME} from './actionTypes';

export const changeTheme = (payload) => ({
  type: CHNAGE_THEME,
  payload,
});

export const checkTheme = (payload) => ({
  type: CHECK_THEME,
  payload,
});
