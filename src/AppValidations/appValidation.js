import { appRegexp } from "./appRegExp";

export const handleFieldValidation = (eve, inputControl) => {
  const { name, value } = eve.target;
  const clonedInputControl = JSON.parse(JSON.stringify(inputControl));
  const inputControlObj = clonedInputControl.find((obj) => {
    return obj.model === name;
  });
  inputControlObj.errorMessage = "";
  inputControlObj.value = value;
  const { criteria } = inputControlObj;
  for (let i = 0; i < criteria.length; i++) {
    const { pattern, errorMessage } = appRegexp[criteria[i]];
    if (!pattern.test(value)) {
      inputControlObj.errorMessage = errorMessage;
      break;
    }
  }
  return clonedInputControl;
};

export const handleFormValidation = (inputControl) => {
  const clonedInputControl = JSON.parse(JSON.stringify(inputControl));
  var dataObj = {};
  clonedInputControl.map((obj) => {
    const { model, value, criteria } = obj;
    dataObj[model] = value;
    for (let i = 0; i < criteria.length; i++) {
      const { pattern, errorMessage } = appRegexp[criteria[i]];
      if (!pattern.test(value)) {
        obj.errorMessage = errorMessage;
        break;
      }
    }
  });
  const isInvalid = clonedInputControl.some((obj) => {
    return obj.errorMessage?.length != 0;
  });
  return [isInvalid, dataObj, clonedInputControl];
};
