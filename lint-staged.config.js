module.exports = {
    // Run format:fix on changes to all files
    "**/*.(ts|js|json)?(x)": () => "yarn format",
    // Run type-check on changes to TypeScript files
    "**/*.(ts)?(x)": () => "yarn type-check",
    // Run ESLint on changes to JavaScript/TypeScript files
    "**/*.(ts|js)?(x)": (filenames) =>
      `yarn lint . ${filenames.join(" ")}`,
  };