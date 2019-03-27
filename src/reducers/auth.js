export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid,
        userName: action.userName,
        userPhoto: action.userPhoto
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  };
};