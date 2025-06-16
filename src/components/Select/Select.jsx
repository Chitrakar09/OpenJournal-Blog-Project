// SelectComponent.jsx
import React from "react";
import { useId } from "react";

const SelectComponent = ({
  label,
  options = [],
  className = "",
  ref,
  ...props
}) => {
  const id = useId();
  return (
    <div className="max-w-[200px] mx-auto">
      {label && (
        <label className="block text-black text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className="
          w-full
          bg-[#14213d] 
          text-white 
          text-center
          border border-[#fca311] 
          rounded-xl 
          px-3 
          py-1 
          shadow-sm 
          focus:outline-none 
          focus:ring-2 
          focus:ring-[#fca311]
          transition 
          duration-200
        "
      >
        {options ? options.map((option)=>(
            <option key={option} value={option} className="bg-[#14213d] text-white">{option}</option>
        )
        ):null}

      </select>
    </div>
  );
};

export default SelectComponent;
