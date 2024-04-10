export const cases = [
  {
    message: "atleast one uppercase character",
    pattern: /[A-Z]{1,}/,
    status: false,
  },
  {
    message: "atleast one lowercase character",
    pattern: /[a-z]{1,}/,
    status: false,
  },
  {
    message: "atleast one numeric character",
    pattern: /[0-9]{1,}/,
    status: false,
  },
  {
    message: "atleast one special character",
    pattern: /[$@#%^&*_]{1,}/,
    status: false,
  },
  {
    message: "atleast eight characters long",
    pattern: /.{8}/,
    status: false,
  },
];
