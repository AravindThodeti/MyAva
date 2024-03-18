export function loadExternalScript(src) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement("script");
    script.src = src;
    script.addEventListener("load", function () {
      resolve();
    });
    script.addEventListener("error", function (e) {
      reject(e);
    });
    document.body.appendChild(script);
  });
}

// validates email against a regular expression; doesn't accept unicode
export function isValidEmail(email) {
  //regular expression taken from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function experienceFormatter(value, unit) {
  if (value !== 1) {
    unit += "s";
  }
  return value + " " + unit;
}

export function extractSPName(name) {
  const res = name?.split(" ");
  if (res?.length >= 1) {
    if (res[0].toLowerCase() == "dr") {
      return res[1];
    }
    return res[0];
  }
  return name;
}

export function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

export const generateRelativeDates = (relativeNumber) => {
  return new Date(new Date().getTime() + relativeNumber * 24 * 60 * 60 * 1000);
};
export const generateRelativeDatesGivenCurrentDate = (
  currentDate,
  relativeNumber
) => {
  return new Date(
    new Date(currentDate).getTime() + relativeNumber * 24 * 60 * 60 * 1000
  );
};

export const generateArrayOfRelativeDates = (currentDate, numberOfDates) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const result = [];
  for (let i = -numberOfDates; i <= numberOfDates; i++) {
    const date = generateRelativeDatesGivenCurrentDate(currentDate, i);
    const data = {
      day: days[date.getDay()],
      date: String(date.getDate()),
      fullDate: date.toISOString().split("T")[0],
    };
    result.push(data);
  }
  return result;
};

export const generateArrayOfFutureDates = (currentDate, noOfDates) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const result = [];
  for (let i = 0; i < noOfDates; i++) {
    const date = generateRelativeDatesGivenCurrentDate(currentDate, i);
    const data = {
      day: days[date.getDay()],
      date: String(date.getDate()),
      fullDate: date.toISOString().split("T")[0],
    };
    result.push(data);
  }
  return result;
};

export const checkIfDateIsLessThanOrEqualTo15thJune = (date) => {
  return new Date(date) <= new Date("2022-06-15");
};

export const capitalizeFirstLetter = (string) => {
  try {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } catch (err) {
    return "";
  }
};

export const capitalizeFirstLetterAndLowerCaseRest = (string) => {
  try {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  } catch (err) {
    return "";
  }
};
/** Compatible for only one query string. Making this custom function to get the
 * query string value because next.js does not provide the query string in first render.
 */
export const extractQueryStringValue = (path, key) => {
  if (path.includes("?")) {
    const keyString = path.split("?")[1];
    if (keyString.includes(key)) {
      return keyString.split("=")[1];
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatDateForLiveSession = (dateString) => {
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

export const checkIsAppHeaderVisibleForPath = (path) => {
  const includedPaths = ["/"];
  return includedPaths.includes(path);
};

export const youTubeGetID = (url) => {
  var ID = "";
  url = url
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  } else {
    ID = url;
  }
  return ID;
};
/** Reference: 'https://gist.github.com/takien/4077195' */

export const modifyDietPlanData = (dietPlan) => {
  dietPlan.session_list.forEach((session) => {
    if (!session.user_recipe_details) {
      session.user_recipe_details = [];
      session.hasDietPlan = false;
    } else {
      session.hasDietPlan = true;
    }
  });
};
