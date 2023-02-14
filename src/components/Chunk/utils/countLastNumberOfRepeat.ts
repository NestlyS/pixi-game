export const countLastNumberOfRepeat = (arr: number[]) =>
  arr.reduce((count, item, index, _arr) => {
    if (index === 0) {
      return 1;
    }

    if (_arr[index - 1] === item) {
      return count + 1;
    }

    return 0;
  }, 0);
