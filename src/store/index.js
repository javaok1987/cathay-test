import Vuex from 'vuex';

import modules from '@/store/modules';

export default new Vuex.Store({
  strict: false, //process.env.NODE_ENV === 'development',
  modules,
});
