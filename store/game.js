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
        '/images/levels/1-level.svg',
        '/images/levels/2-level.svg',
        '/images/levels/3-level.svg',
        '/images/levels/4-level.svg',
        '/images/levels/5-level.svg',
        '/images/levels/complete-level.svg',
    ],
    currentLevel: 0,
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
    selectedGameCards: null
});

export const getters = {
    isOpenable: (state, getters) => {
        return state.isOpenable;
    }
}

export const mutations = {
    moveLevel(state, value) {
        if (state.currentLevel == 5) return;
        if (value) {
            state.currentLevel = value;
            return;
        }
        state.currentLevel = ++state.currentLevel;
    },
    selectLevel(state, levelId) {
        const gameCards = JSON.parse(JSON.stringify(unselectedGameCards));
        const levelIndex = gameCards.findIndex(card => card.id == levelId);
        gameCards[levelIndex].image = selectedCardImage;
        state.selectedGameCards = gameCards;
    },
    resetPlay(){
        state.selectedGameCards = null;
    },
    setGameOpenability(state, payload) {
        state.isOpenable = payload;
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
    }
}