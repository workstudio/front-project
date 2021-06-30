'use strict'

let settings = {
  resturl: process.env.VUE_APP_BASE_API,
  userType: '',
  title: 'local',
}

import local from './local';
import current from './current';

settings = Object.assign(settings, current, local);
export default settings;
