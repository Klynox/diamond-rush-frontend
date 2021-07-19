import firebase, { auth, GoogleProvider } from '@/services/fireinit.js'

export const state = () => ({
    user: null,
    isLoading: true
});

export const getters = {
    activeUser: (state, getters) => {
        return state.user;
    },
    pageLoading: (state, getters) => {
        return state.isLoading;
    }
}
export const mutations = {
    setUser(state, payload) {
        state.user = payload;
    },
    setPageLoader(state, payload) {
        state.isLoading = payload;
    }
}
export const actions = {
    autoSignIn({ commit }, payload) {
        commit('setUser', payload);
    },

    signInWithGoogle({ commit }) {
        return new Promise((resolve, reject) => {
            auth.signInWithPopup(GoogleProvider).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    },

    signOut({ commit }) {
        auth.signOut().then(() => {
            commit('setUser', null);
        }).catch(err => console.log(error))
    }
}