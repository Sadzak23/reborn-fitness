export default (state = [], action) => {
  switch (action.type) {
    case 'CREATE_TIMER':
      return [...state, action.timer];
    case 'REMOVE_TIMER':
      return state.filter((timer) => timer.id !== action.id);
    default:
      return state;
  };
};