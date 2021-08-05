import { DB } from '@/services/fireinit.js'

export default (context) => {
    const { store } = context;

    return new Promise((resolve, reject) => {
        const user = store.getters.activeUser;
        if (user) {
            DB.collection('wallets').where('uid', '==', user.uid).onSnapshot((snapshot) => {
                if (!snapshot.empty) {
                    const wallet = snapshot.docs[0].data();
                    store.commit("wallet/setBalance", wallet.balance);
                    store.commit("wallet/setPublicKey", wallet.publicKey);
                    store.dispatch("wallet/setBalanceEquivalent", wallet.balance);
                }
            });
        }
        resolve();
    });
}