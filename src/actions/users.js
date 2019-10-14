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

//////////////////////////////// Strong Lifts ///////////////////////////////////

// SET/EDIT/SAVE_WORKOUT_5X5
export const setEditData5x5 = (id, data) => ({
  type: 'SET/EDIT/SAVE_WORKOUT_5X5',
  id,
  data
});

export const startSetEditData5x5 = (userId, data) => {
  return (dispatch, setState) => {
    const uid = setState().auth.uid;
    return database.ref(`admins/${uid}/users/${userId}/workouts`).update({
      ...data
    })
      .then(() => {
        dispatch(setEditData5x5(userId, data));
      }).then(() => {
        return "done"
      })
  };
};