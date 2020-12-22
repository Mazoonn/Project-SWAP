import React from 'react';

//Input text
const FilterInput = ({ placeholder, name, onChange, value }) =>
{
    return (
    <input 
        value={value}
        type="text" 
        className="form-control" 
        placeholder
        name={name}
        placeholder={placeholder}
        onChange={onChange}
    />
    );
};

export default FilterInput;