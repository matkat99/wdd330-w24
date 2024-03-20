import { writable } from "svelte/store";

export const currentRoute = writable("");

export const isAuthenticated = writable(false);
export const user = writable();
export const popupOpen = writable(false);
