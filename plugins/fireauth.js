import { auth } from '@/services/fireinit.js'

export default (context) => {
    const { store } = context;

    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            if (user) {
                const userDetails = {
                    username: user.displayName,
                    email: user.email,
                    profilePhoto: user.photoURL,
                    phone: user.phoneNumber,
                    uid: user.uid
                }
                store.commit('setUser', userDetails);
            }
            resolve()
        })
    })
}