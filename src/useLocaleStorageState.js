/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

export function useLocaleStorageState(initialState, key){
    const [value, setValue] = useState(function(){
        const storedValue = localStorage.getItem(key)
        return JSON.parse(storedValue)
      });


      useEffect(()=>{
    
        localStorage.setItem('watched', JSON.stringify(value));
        }, [value, key])

        return [value, setValue]
}