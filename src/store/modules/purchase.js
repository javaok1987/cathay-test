import Vue from 'vue';
import Vuex from 'vuex';

import * as mutationTypes from '@/store/mutations.type';
import * as actionsTypes from '@/store/actions.type';

Vue.use(Vuex);

const initialState = {
  orders: [],
};

const state = { ...initialState };

const getters = {
  orders: (state) => {
    // 轉換西元年.
    state.orders.forEach(function(item, index) {
      const minguoYear = item.date.split('/');
      const adYear = new Date(parseInt(minguoYear[0], 10) + 1911, parseInt(minguoYear[1], 10) - 1, minguoYear[2]);
      item.adYear = adYear;
    });

    // 分類排序： Sort Date By DESC.
    state.orders.sort((a, b) => b.adYear - a.adYear);
    return state.orders;
  },
};

const mutations = {
  [mutationTypes.SET_ORDERS](state, payload) {
    state.orders = payload;
  },
};

const actions = {
  async [actionsTypes.INITIALIZE]({ dispatch }) {
    await dispatch(`purchase/${actionsTypes.FETCH_ORDER_DATA}`, null, { root: true });
  },
  async [actionsTypes.FETCH_ORDER_DATA]({ commit }) {
    const mockData = [
      {
        name: 'Livi優活 抽取式衛生紙(100抽x10包x10串/箱)',
        logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
        status: {
          code: 3,
          type: '已取消',
        },
        date: '107/6/12',
      },
      {
        name: 'BALMUDA The Toaster 百慕達烤麵包機-黑色',
        logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
        status: {
          code: 2,
          type: '已成立',
        },
        date: '108/7/21',
      },
      {
        name: '贈-短慧萬用鍋HD2133+三合一濾網「LG樂金」韓國原裝...',
        logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
        status: {
          code: 1,
          type: '處理中',
        },
        date: '108/6/2',
      },
      {
        name: 'Apple AirPds 2',
        logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
        status: {
          code: 4,
          type: '已送達',
        },
        date: '108/3/02',
      },
    ];
    commit(mutationTypes.SET_ORDERS, mockData);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
