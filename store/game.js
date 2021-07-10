export const state = () => ({
    levelImages: [
        '/images/levels/1-level.svg',
        '/images/levels/2-level.svg',
        '/images/levels/3-level.svg',
        '/images/levels/4-level.svg',
        '/images/levels/5-level.svg',
        '/images/levels/complete-level.svg',
    ],
    currentLevel: 0,
    cardSelectionOptions: [
        {
            state: 'good',
            image: ''
        }
    ],
    gameCards: [
        {
            id: 1,
            image: '/images/game-cards/unselected.svg',
        },
        {
            id: 2,
            image: '/images/game-cards/unselected.svg',
        },
        {
            id: 3,
            image: '/images/game-cards/unselected.svg',
        },
        {
            id: 4,
            image: '/images/game-cards/unselected.svg',
        },
    ]
});

export const mutations = {
    moveLevel(state, value) {
        if(state.currentLevel == 5) return;
        if (value) {
            state.currentLevel = value;
            return;
        }
        state.currentLevel = ++state.currentLevel;
    },
}