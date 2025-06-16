import React from "react";
import { useId } from "react";
function InputField({
  label,
  type = "text",
  name,
  placeholder = "",
  required = true,
  ref, //gives the parent a reference to this input field
  className = "",
  ...props
}) {
    const id=useId();
  return (
    <div className="mb-4 w-full">
        {/* only if label given, then the label will be shown */}
      {label && (
        <label
          htmlFor={id} //for seo purpose
          className="block mb-1 text-sm font-medium text-[#14213d]"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        ref={ref}
        className={`w-full px-4 py-2 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fca311] text-[#14213d] placeholder-gray-400 bg-white ${className}`}
        {...props} //if other props also given then it spreads the props
      />
    </div>
  );
}

export default InputField;
