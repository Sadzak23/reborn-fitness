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
    setAction();
  }
}