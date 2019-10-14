export default (state = [], action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return [...state, action.user];
    case 'REMOVE_USER':
      return state.filter((user) => user.id !== action.id);
    case 'EDIT_USER':
      return state.map((user) => {
        if (user.id === action.id) {
          return {
            ...user,
            ...action.updates
          }
        }
        else {
          return user
        }
      });
    case 'SET_USERS':
      return action.users
    case 'SET/EDIT/SAVE_WORKOUT_5X5':
      return state.map((user) => {
        if (user.id === action.id) {
          return {
            ...user,
            workouts: {
              ...user.workouts,
              strongLifts: {
                ...user.workouts.strongLifts,
                ...action.data.strongLifts
              },
              history: {
                ...user.workouts.history,
                ...action.data.history
              }
            }
          }
        }
        else {
          return user
        }
      });
    default:
      return state;
  };
};