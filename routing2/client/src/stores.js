import { writable } from "svelte/store";

export const currentRoute = writable("");

// add stores for tracking authentication
export const isAuthenticated = writable(false);

export const user = writable();
export const popupOpen = writable(false);
export const error = writable();
