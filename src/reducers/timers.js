export default (state = [], action) => {
  switch (action.type) {
    case 'CREATE_TIMER':
      return [...state, action.timer];    
    default:
      return state;
  };
};