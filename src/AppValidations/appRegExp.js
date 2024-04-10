export const appRegexp = {
  Required: {
    pattern: /./,
    errorMessage: "Enter a value",
  },
  "Email valid": {
    pattern: /^[a-z0-9]{1}[a-zA-Z0-9]{1,}@[a-z]{4,}\.[a-z]{2,3}$/,
    errorMessage: "Please enter valid mail id",
  },
  Min8Char: {
    pattern: /^[a-zA-Z0-9@#$%&*^]{8,}$/,
    errorMessage: "Should contain min eight chars",
  },
  "10CharOnly": {
    pattern: /^.{10}$/,
    errorMessage: "Should be ten char long",
  },
  Min4Char: {
    pattern: /^[a-zA-Z]{4,}$/,
    errorMessage: "Should contain atleast four characters",
  },
  Max6Char: {
    pattern: /^.{6}$/,
    errorMessage: "Should contain max six chars",
  },
  Number: {
    pattern: /^[0-9]+$/,
    errorMessage: "Numeric chars only",
  },
  Max15Char: {
    pattern: /^.{15}$/,
    errorMessage: "Should contain max 15 chars",
  },
};
