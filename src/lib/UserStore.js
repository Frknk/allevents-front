import { writable } from "svelte/store";

export const User = (function () {
  const { subscribe, set } = writable(JSON.parse(sessionStorage.getItem('user')) || 'init');

  return {
    subscribe,
    signout: () => {
        sessionStorage.removeItem('user');
        set('init');
    },
    signin: (data) => {
        sessionStorage.setItem('user', JSON.stringify(data));
        set(data);
    },
    retrieve : () => {
        return JSON.parse(sessionStorage.getItem('user'));
    }
  };
})();