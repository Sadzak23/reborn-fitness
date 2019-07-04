export default (state = [], action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return [...state, action.user];
    default:
      return state;
  };
};