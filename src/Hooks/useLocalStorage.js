import { useState, useEffect } from "react";

function useLocalStorage(key, initial_state) {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) || initial_state
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorage;
