import { useEffect, useState } from "react";

function usePersistedState(key, initialValue) {
  const [state, setState] = useState(() => {
    const persistedState = localStorage.getItem(key);
    return persistedState !== null ? JSON.parse(persistedState) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default usePersistedState;
