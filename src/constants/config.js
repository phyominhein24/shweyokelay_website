import { useState, useEffect } from "react";

export const keys = {
    API_TOKEN: "TOKEN",
    USER: "USER",
    PERMISSION: "PERMISSION",
    ROLE: "ROLE",
    LANGUAGE: "LANGUAGE",
    ISLOGIN: "ISLOGIN"
}

const useLocalStorageState = (key, defaultValue = null) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  const updateValue = (newValue) => {
    if (newValue === null || newValue === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
    setValue(newValue);
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        const newValue = event.newValue ? JSON.parse(event.newValue) : null;
        setValue(newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [value, updateValue];
};

export default useLocalStorageState;
