import { useState, useEffect } from "react";

function useLocalStorage<T>(key:string, initialValue:T)
    :[value:T, setValue: React.Dispatch<React.SetStateAction<T>>]{
    const [value, setValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error can\'t writ to localStorage');
        }
    }, [key, value]);

  return[value, setValue];
}
export default useLocalStorage;