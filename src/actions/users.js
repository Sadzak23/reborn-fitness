import database from '../firebase/firebase'

// CREATE_USER
export const createUser = (user) => ({
  type: 'CREATE_USER',
  user
});

export const startCreateUser = (user) => {
  return (dispatch, setState) => {
    const uid = setState().auth.uid;
    return database.ref(`admins/${uid}/users`).push(user)
      .then((ref) => {
        dispatch(createUser({
          id: ref.key,
          ...user
        }));
      })
  };
};

// UPDATE_USER
export const updateUser = (user) => ({
  type: 'UPDATE_USER',
  user
});

// SET_USERS
export const setUsers = (users) => ({
  type: "SET_USERS",
  users
});

export const startSetUsers = () => {
  return (dispatch, setState) => {
    const uid = setState().auth.uid;
    return database.ref(`admins/${uid}/users`)
      .once('value')
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((child) => {
          users.push({
            id: child.key,
            ...child.val()
          })
        })
        dispatch(setUsers(users))
      })
  };
};