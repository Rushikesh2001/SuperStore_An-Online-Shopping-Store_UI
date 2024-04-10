import React from "react";

type Proptypes = {
  type: string;
  model: string;
  value: string;
  handleChange: (a: object) => void;
  id: string;
};

export const Input = ({ type, model, value, handleChange, id }: Proptypes) => {
  switch (type) {
    case "text":
    case "password":
      return (
        <>
          <input
            type={type}
            name={model}
            value={value}
            onChange={handleChange}
            key={id}
          />
        </>
      );

    case "textarea":
      return (
        <>
          <textarea
            cols={30}
            rows={10}
            name={model}
            value={value}
            onChange={handleChange}
          ></textarea>
        </>
      );
  }
};
