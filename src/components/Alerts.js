import { history } from '../routers/AppRouter';
import Swal from 'sweetalert2';

export const userFormAlerts = (firstName, lastName, birthdate, height, weight, gender, onAction) => {
  const now = new Date();
  const title = "User form incomplete"
  if (!firstName || !lastName) {
    Swal.fire(title, "Please provide user name!", "error")
  } else if (!birthdate || birthdate > now) {
    Swal.fire("Birthdate invalid!", "Please enter valid birthdate", "error")
  } else if (weight < 20) {
    Swal.fire(title, "Please enter valid weight!", "error")
  } else if (height < 100 || height > 250) {
    Swal.fire(title, "Please enter valid height!", "error")
  }
  else {
    onAction();
  }
};

export const timerFormAlerts = {
  title: "Timer incomplete!",
  noName: "You didn't entre timer name!",
  noIntreval: "You can't have timer without intervals!",
  intTitle: "Interval incomplete!",
  intNoName: "Please provide interval name!",
  intDuration: "Please set valid duration!"
};

export const onRemoveAlert = (startRemove, id, name) => Swal.fire({
  title: `Delete ${name}?!`,
  text: "You can't bring it back!",
  type: "error",
  confirmButtonText: "Yes, delete it!",
  confirmButtonColor: "#f27474",
  showCancelButton: true
})
  .then((result) => result.value &&
    Swal.fire("Deleted!", `${name} has been deleted!`, "success") &&
    startRemove(id)
  );

// 5x5 Workout done
export const done5x5 = (workout, onSave) => {
  workout.exercise1.done !== "" &&
  workout.exercise3.done !== "" &&
  workout.exercise3.done !== "" ?
    Swal.fire({
      title: "Well done!",
      text: "Would you like to save your workout?!",
      type: "success",
      confirmButtonText: "Save!",
      showCancelButton: true,
      cancelButtonText: "Don't Save"
    }).then((result) => {
      if (result.value) {
        onSave();
        Swal.fire({
          type: 'success',
          title: 'Workout Saved!',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000
        })
          history.goBack()
      } else {
        history.goBack()
      }
    })
    :
    Swal.fire("Not yet", "Your workout is not complete!", "info");
};

//Exit workout confirmation
export const onExit = () => Swal.fire({
  type: 'warning',
  title: "Are you sure you want to quit!",
  text: "Your progress will not be saved?!",
  confirmButtonText: "Yes, I quit!",
  confirmButtonColor: "#f8bb86",
  showCancelButton: true,
})
  .then((result) => result.value && history.goBack()
  );