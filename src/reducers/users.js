export default (state = [], action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return [...state, action.user];
    case 'REMOVE_USER':
      return state.filter((user) => user.id !== action.id);
    case 'SET_USERS':
      return action.users
    default:
      return state;
  };
};