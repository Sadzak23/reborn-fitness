import database from '../firebase/firebase'

// CREATE_TIMER
export const createTimer = (timer) => ({
  type: 'CREATE_TIMER',
  timer
});

// export const startCreateTimer = (workoutData = {}) => {
//   return (dispatch, getState) => {
//     const uid = getState().auth.uid;
//     const {
//       name = '',
//       warmupTime = 10,
//       cooldownTime = 0,
//       intervals = []      
//     } = workoutData;

//     const timer = { name, warmupTime, cooldownTime, intervals };

//     return database.ref(`users/${uid}/timers`).push(timer).then((ref) => {
//       dispatch(createTimer({
//         id: ref.key,
//         ...timer
//       }))
//     });
//   };
// };

// REMOVE_TIMER
export const removeTimer = (id = null) => ({
  type: 'REMOVE_TIMER',
  id
});

// export const startRemoveExpense = ({ id }) => {
//   return (dispatch, setState) => {
//     const uid = setState().auth.uid;
//     return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
//       dispatch(removeExpense({ id }));
//     })
//   };
// };

// // EDIT_EXPENSE
// export const editExpense = (id, updates) => ({
//   type: 'EDIT_EXPENSE',
//   id,
//   updates
// });

// export const startEditExpense = (id, updates) => {
//   return (dispatch, setState) => {
//     const uid = setState().auth.uid;
//     return database.ref(`users/${uid}/expenses/${id}`).update({
//       ...updates
//     }).then(() => {
//       dispatch(editExpense(id, updates));
//     })
//   };
// };