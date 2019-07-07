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

// REMOVE_USER
export const removeUser = (id = null) => ({
  type: 'REMOVE_USER',
  id
});

export const startRemoveUser = (id) => {
  return (dispatch, setState) => {
    const uid = setState().auth.uid;
    return database.ref(`admins/${uid}/users/${id}`).remove()
      .then(() => {
        dispatch(removeUser(id));
      })
  };
};

// EDIT_USER
export const editUser = (id, updates) => ({
  type: 'EDIT_USER',
  id,
  updates
});

export const startEditUser = (id, updates) => {
  return (dispatch, setState) => {
    const uid = setState().auth.uid;
    return database.ref(`admins/${uid}/users/${id}`).update({
      ...updates
    }).then(() => {
      dispatch(editUser(id, updates));
    })
  };
};

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