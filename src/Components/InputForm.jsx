import React from "react";

const InputForm = ({
  heading,
  sub,
  label,
  type = "text",
  name,
  value,
  onChange,
}) => {
  return (
    <div className="mb-4 ">
      {/* Render heading and subheading only if present */}
      {heading && (
        <h2 className="text-2xl font-bold mb-1 text-center">{heading}</h2>
      )}
      {sub && <p className="text-lg text-gray-400 mb-2 text-center">{sub}</p>}

      {/* Render input field only if label is passed */}
      {label && (
        <div>
          <label className="block mb-1 font-medium">{label}</label>
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required
            className="w-full p-2 rounded border focus:outline-none 
             bg-white/80 text-black placeholder:text-gray-500 
             dark:bg-white/10 dark:text-white dark:placeholder:text-white/40 
             border-gray-300 dark:border-white/20"
          />
        </div>
      )}
    </div>
  );
};

export default InputForm;
