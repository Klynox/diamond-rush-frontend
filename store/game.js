const unselectedCardImage = '/images/game-cards/unselected.svg';
const selectedCardImage = '/images/game-cards/selected.svg';
const unselectedGameCards = [
    {
        id: 1,
        image: unselectedCardImage,
    },
    {
        id: 2,
        image: unselectedCardImage,
    },
    {
        id: 3,
        image: unselectedCardImage,
    },
    {
        id: 4,
        image: unselectedCardImage,
    },
];

export const state = () => ({
    isOpenable: true,
    levelImages: [
        {
            level: 1,
            image: '/images/levels/1-level.svg',
        },
        {
            level: 2,
            image: '/images/levels/2-level.svg',
        },
        {
            level: 3,
            image: '/images/levels/3-level.svg',
        },
        {
            level: 4,
            image: '/images/levels/4-level.svg',
        },
        {
            level: 5,
            image: '/images/levels/5-level.svg',
        },
        {
            level: 6,
            image: '/images/levels/complete-level.svg',
        },
    ],
    currentLevel: 1,
    defaultGameCards: [
        {
            id: 1,
            image: selectedCardImage,
        },
        {
            id: 2,
            image: selectedCardImage,
        },
        {
            id: 3,
            image: selectedCardImage,
        },
        {
            id: 4,
            image: selectedCardImage,
        },
    ],
    selectedGameCards: null,
    selectionResultCards: null,
    showResultView: false,
    isLoading: false,
    selectedCard: null,
    selectionState: null,
    selectionStateType: null
});

export const getters = {
    isOpenable: (state, getters) => {
        return state.isOpenable;
    },
    currentLevel: (state, getters) => {
        return state.currentLevel;
    }
}

export const mutations = {
    setLevel(state, value) {
        state.currentLevel = value;
    },
    setResultCards(state, payload) {
        state.showResultView = true;
        state.selectionResultCards = payload.cards;
        state.selectionState = payload.selectedCard.state;
        state.selectionStateType = payload.selectedCard.type;
    },
    selectLevel(state, levelId) {
        state.selectedCard = levelId;
        const gameCards = JSON.parse(JSON.stringify(unselectedGameCards));
        const levelIndex = gameCards.findIndex(card => card.id == levelId);
        gameCards[levelIndex].image = selectedCardImage;
        state.selectedGameCards = gameCards;
    },
    resetPlay(state) {
        state.selectedGameCards = null;
        state.selectedCard = null;
    },
    continueGamePlay(state) {
        state.selectionResultCards = null;
        state.showResultView = false;
        state.selectionState = null;
        state.selectionStateType = null;
    },
    setLoading(state, payload) {
        state.isLoading = payload;
    },
    setGameOpenability(state, payload) {
        state.isOpenable = payload;
    },
    resetGame() {
        state.currentLevel = 1;
        state.selectedGameCards = null;
        state.selectionResultCards = null;
        state.showResultView = false;
        state.isLoading = false;
        state.selectedCard = null;
        state.selectionState = null;
        state.selectionStateType = null;
    }
}

export const actions = {
    async makeOpenable({ commit }, payload) {
        try {
            await this.$axios.post(
                "/open-game/" + payload.hash,
                {
                    userId: payload.uid,
                }
            );
            commit('setGameOpenability', true);
        } catch (err) {
            commit('setGameOpenability', false);
        }
    },
    async playGame({ commit }, payload) {
        commit('setLoading', true);
        try {
            const result = await this.$axios.post('/playgame/' + payload.gameId, { userId: payload.uid, selection: payload.selection });
            commit('setResultCards', result.data);
            commit('resetPlay');
            commit('setLoading', false);
        } catch (err) {
            commit('setLoading', false);
            console.log('An error has happened here');
            console.log(err);
        }
    }
}