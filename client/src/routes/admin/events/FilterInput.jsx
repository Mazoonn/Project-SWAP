import React from 'react';

const FilterInput = ({ placeholder, name, onChange }) =>
{
    return (
    <input 
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