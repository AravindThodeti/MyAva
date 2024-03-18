export const convertFtToFtInch = (ftValue) => {
    const ft = Math.trunc(ftValue)
    const fraction = ftValue - ft
    const inch = fraction*12
    return `${ft}ft${Math.trunc(inch)}${inch}`
  };