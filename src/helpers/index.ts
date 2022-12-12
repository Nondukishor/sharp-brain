/**
 * @function doFLC abbr doFirstLatterCapital
 * @param value : string
 * @returns ReferenceError | string
 */

const doFLC = (value?: string) => {
  if (value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  throw new ReferenceError('Please provide a valid string');
};

const addSymbol = (value: string, symbol: string) => {
  if (value) {
    return value.replaceAll('', symbol);
  }
  throw new ReferenceError('Please provide a valid string');
};
