import {createStore} from "vuex";
import state from './state';
import actions from './actions';
import * as getters from './getters';
import mutations from './mutations'
import createPersistedState from 'vuex-persistedstate'


// Create a new store instance.
export default createStore({
    state,
    mutations,
    actions,
    getters,
    // 数据持久化
    plugins: [
        createPersistedState({
            storage: window.localStorage,
            key: "store",
            render(state: any) {
                return {...state};
            },
        }),
    ],
});
