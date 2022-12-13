/**
 * @function doFLC abbr doFirstLatterCapital
 * @param value : string
 * @returns ReferenceError | string
 */

export const doFLC = (value?: string) => {
  if (value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  throw new ReferenceError('Please provide a valid string');
};

export const addSymbol = (value: string, symbol: string) => {
  if (value) {
    return value.replaceAll('', symbol);
  }
  throw new ReferenceError('Please provide a valid string');
};
