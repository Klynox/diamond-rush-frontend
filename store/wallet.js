export const state = () => ({
    balance: 0,
    usdEquivalent: 0
});

export const mutations = {
    setBalance(state, balance) {
        state.balance = balance;
    },
    setBalanceEquivalent(state, balanceEquivalent) {
        state.usdEquivalent = balanceEquivalent;
    }
}

export const actions = {
    setBalanceEquivalent({ commit }, payload) {
        commit('setBalanceEquivalent', 400);
    }
}