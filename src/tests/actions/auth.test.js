import { login, logout } from '../../actions/auth';

test("Should setup Login action object", () => {
  const uid = "poiadgjkewr";
  const action = login(uid);
  expect(action).toEqual({
    type: "LOGIN",
    uid
  });
});

test("Should setup Logout action object", () => {
  const action = logout();
  expect(action).toEqual({
    type: "LOGOUT"
  });
});