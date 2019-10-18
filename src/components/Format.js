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