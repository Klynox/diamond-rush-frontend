export const state = () => ({
    balance: 0,
    usdEquivalent: 0,
    publicKey: null
});

export const mutations = {
    setBalance(state, balance) {
        state.balance = balance;
    },
    setPublicKey(state, publicKey){
        state.publicKey = publicKey;
    },
    setBalanceEquivalent(state, balanceEquivalent) {
        state.usdEquivalent = balanceEquivalent;
    },
    clearBalance(state) {
        state.balance = 0;
        state.usdEquivalent = 0;
    }
}

export const actions = {
    async setBalanceEquivalent({ commit }, amountInBitclout) {
        try {
            const result = await this.$axios.get('http://52.58.136.147/api/v0/get-exchange-rate');
            const USDCentsInBitclout = result.data.USDCentsPerBitCloutExchangeRate;
            const centsPerDollar = 100;
            const amountInDollar = (USDCentsInBitclout / centsPerDollar) * amountInBitclout;
            commit('setBalanceEquivalent', amountInDollar.toFixed(2));
        } catch (err) {
            console.log(err);
        }
    }
}