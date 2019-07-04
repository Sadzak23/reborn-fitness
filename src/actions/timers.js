import database from '../firebase/firebase'

// CREATE_TIMER
export const createTimer = (timer) => ({
  type: 'CREATE_TIMER',
  timer
});

export const startCreateTimer = (timer) => {
  return (dispatch, setState) => {
    const uid = setState().auth.uid;
    return database.ref(`admins/${uid}/timers`).push(timer)
      .then((ref) => {
        dispatch(createTimer({
          id: ref.key,
          ...timer
        }));
      })
  };
};

// REMOVE_TIMER
export const removeTimer = (id = null) => ({
  type: 'REMOVE_TIMER',
  id
});

export const startRemoveTimer = (id) => {
  return (dispatch, setState) => {
    const uid = setState().auth.uid;
    return database.ref(`admins/${uid}/timers/${id}`).remove()
      .then(() => {
        dispatch(removeTimer(id));
      })
  };
};

// EDIT_TIMER
export const editTimer = (id, updates) => ({
  type: 'EDIT_TIMER',
  id,
  updates
});

export const startEditTimer = (id, updates) => {
  return (dispatch, setState) => {
    const uid = setState().auth.uid;
    return database.ref(`admins/${uid}/timers/${id}`).update({
      ...updates
    }).then(() => {
      dispatch(editTimer(id, updates));
    })
  };
};

// SET_TIMERS
export const setTimers = (timers) => ({
  type: "SET_TIMERS",
  timers
});

export const startSetTimers = () => {
  return (dispatch, setState) => {
    const uid = setState().auth.uid;
    return database.ref(`admins/${uid}/timers`)
      .once('value')
      .then((snapshot) => {
        const timers = [];
        snapshot.forEach((child) => {
          timers.push({
            id: child.key,
            ...child.val()
          })
        })
        dispatch(setTimers(timers))
      })
  };
};