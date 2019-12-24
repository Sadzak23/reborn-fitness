export const add0 = (num) => ("0" + num).slice(-2);

export const formatSeconds = (seconds) => {  
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${add0(minutes)}:${add0(seconds)}`;
  }
  else {
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    const hours = Math.floor(minutes / 60)
    minutes = minutes % 60;
    return `${add0(hours)}:${add0(minutes)}:${add0(seconds)}`;
  }
};

export const formatMinutes = (min) => {
  if (min >= 60) {
    const hours = Math.floor(min / 60);
    min = min % 60;
    return `${hours}h:${add0(min)}`;
  }
  else {
    return min;
  }
};

export const moveArrIndex = (array, from, to, editAction, setAction) => {
  const newIndex = to - 1;
  if (newIndex !== from) {
    const indexArr = array.map(e => e.index)
    const target = indexArr[from]
    const increment = newIndex < from ? -1 : 1;
    for (let i = from; i != newIndex; i += increment) {
      indexArr[i] = indexArr[i + increment]
    }
    indexArr[newIndex] = target;

    indexArr.forEach((e, i) => {
      editAction(array.find(element => element.index === e).id, { index: i })
    })
    // Refresh UI
    !!setAction && setAction();
  }
}