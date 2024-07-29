// useInputGroup.js
import {useState} from 'react';

const useInputGroup = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');

  const handleChange = newValue => {
    setValue(newValue);
    setError(''); // Reset error when value changes
  };

  return {
    value,
    setValue,
    error,
    setError,
    handleChange,
  };
};

export default useInputGroup;
