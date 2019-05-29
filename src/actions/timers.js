import database from '../firebase/firebase'

// CREATE_TIMER
export const createTimer = (timer) => ({
  type: 'CREATE_TIMER',
  timer
});

export const startCreateTimer = (workoutData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      name = '',
      warmupTime = 10,
      cooldownTime = 0,
      intervals = []      
    } = workoutData;

    const timer = { name, warmupTime, cooldownTime, intervals };

    return database.ref(`users/${uid}/expenses`).push(timer).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...timer
      }))
    });
  };
};

// // REMOVE_EXPENSE
// export const removeExpense = ({ id } = {}) => ({
//   type: 'REMOVE_EXPENSE',
//   id
// });

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

// // SET_EXPENSES
// export const setExpenses = (expenses) => ({
//   type: 'SET_EXPENSES',
//   expenses
// });

// export const startSetExpenses = () => {
//   return (dispatch, setState) => {
//     const uid = setState().auth.uid;
//     return database.ref(`users/${uid}/expenses`)
//       .once('value')
//       .then((snapshot) => {
//         const expensesData = [];
//         snapshot.forEach((child) => {
//           expensesData.push({
//             id: child.key,
//             ...child.val()
//           });
//         });
//         dispatch(setExpenses(expensesData));
//       });
//   };
// };