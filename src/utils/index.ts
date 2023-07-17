
export const convertSecondsToScore = (seconds: number | null) => {
  if (!seconds) return seconds;

  const arr = [...String(seconds).split('')];
  const sliced = arr.slice(0, arr.length - 1);
  if (sliced.length < 3) sliced.unshift('0');
  sliced.splice(sliced.length - 2, 0, '.');

  return sliced.join('') + 'x';
};
