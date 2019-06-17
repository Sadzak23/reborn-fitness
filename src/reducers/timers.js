export default (state = [], action) => {
  switch (action.type) {
    case 'CREATE_TIMER':
      return [...state, action.timer];
    case 'REMOVE_TIMER':
      return state.filter((timer) => timer.id !== action.id);
    case 'EDIT_TIMER':
      return state.map((timer) => {
        if (timer.id === action.id) {
          return {
            ...timer,
            ...action.updates
          }
        }
        else {
          return timer
        }
      });
    default:
      return state;
  };
};