const getExpiryDate = (days) => {
  const date = new Date();
  date?.setDate(date.getDate() + days);
  return date;
};

const getOneDayBeforeDate = () => {
  const date = new Date();
  date?.setDate(date.getDate() - 1);
  return date;
};

const cookieToJson = () => {
  var arr = window.document.cookie.split(";");
  const cookieObj = arr?.reduce((init, val) => {
    const [key, value] = val.trim().split("=");
    init[key?.trim()] = value?.trim();
    return init;
  }, {});
  return cookieObj;
};

export class Cookie {
  static hasActiveSession = () => {
    if (typeof window === "undefined") return;
    var cookie = cookieToJson();
    if (cookie["token"]) {
      return true;
    }
    return false;
  };
  static setItem = (key, value, days) => {
    if (typeof window === "undefined") return;
    if (days) {
      document.cookie = `${key}=${value};expires=${getExpiryDate(days)}`;
    } else {
      document.cookie = `${key}=${value}`;
    }
  };
  static getItem = (key) => {
    const cookie = cookieToJson();
    return cookie[key];
  };
  static removeItem = (key) => {
    if (typeof window === "undefined") return;
    document.cookie = `${key}=;expires=${getOneDayBeforeDate()}`;
  };

  static clearCookie = () => {
    if (typeof window === "undefined") return;
    const cookieArr = document.cookie.split(";");
    cookieArr?.forEach((val, ind) => {
      const [key] = val.split("=");
      document.cookie = `${key}=;path=/;expires=${getOneDayBeforeDate()}`;
    });
  };
}
