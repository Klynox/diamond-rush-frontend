export const state = () => ({
    isFreshDepositDialog: false,
    isFreshWithdrawalDialog: false,
    displayDepositDialog: false,
    displayWithdrawalDialog: false,
});

export const mutations = {
    toggleDepositDialog(state) {
        state.displayDepositDialog = !state.displayDepositDialog;
    }
}