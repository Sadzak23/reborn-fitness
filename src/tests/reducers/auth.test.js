import authReducer from '../../reducers/auth';

test("Should set uid for login", () => {
  const oldState = {}
  const action = {
    type: "LOGIN",
    uid: "qwedfshcv"
  };
  const state = authReducer(oldState, action);
  expect(state.uid).toBe(action.uid);
});

test("Should clear uid for logout", () => {
  const oldState = { uid: "qwedfshcv" };
  const action = {
    type: "LOGOUT"
  };
  const state = authReducer(oldState, action);
  expect(state).toEqual({});
});