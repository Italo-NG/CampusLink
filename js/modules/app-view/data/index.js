import {
  APP_VIEW_INITIAL_SCREEN,
  APP_VIEW_RULES,
  createInitialData,
  readData,
  setData,
  APP_VIEW_ROLES
} from './initialData.js';
import { authScreens } from './authScreens.js';
import { studentScreens } from './studentScreens.js';
import { reportScreens } from './reportScreens.js';
import { teacherScreens } from './teacherScreens.js';
import { supportScreens } from './supportScreens.js';
import { modals } from './modals.js';

var screens = [].concat(authScreens, studentScreens, reportScreens, teacherScreens, supportScreens);

export const APP_VIEW_SCREENS = screens.reduce(function (map, item) {
  map[item.id] = item;
  return map;
}, {});

export const APP_VIEW_MODALS = modals.reduce(function (map, item) {
  map[item.id] = item;
  return map;
}, {});

export {
  APP_VIEW_INITIAL_SCREEN,
  APP_VIEW_RULES,
  createInitialData,
  readData,
  setData,
  APP_VIEW_ROLES
};
