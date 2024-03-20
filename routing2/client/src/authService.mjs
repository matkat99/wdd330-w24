/*
https://auth0.com/blog/authenticating-svelte-apps/
login to Auth0.
Create a new application.
Set  the callback, logout, allowed origin URLs to http://localhost:5173
create a .env and add  
VITE_AUTH0_CLIENT_ID=AUTH0_APP_CLIENT_ID 
VITE_AUTH0_DOMAIN=AUTH0_DOMAIN
VITE_API_SERVER_URL=URL_FROM_BACKEND_TEAM
VITE_AUTH0_AUDIENCE=DOMAIN_FROM_AUTH0
 **NOTE these values will probably be provided by the backend team for the project.

 install @auth0-spa-js
 import createAuth0Client
 import user, isAuthenticated, popupOpen stores
 add createClient function: should initialize  Auth0 client with given options and store the instance in a variable called auth0.
 add loginWithPopup function: 
    set popupOpen to true
    call Auth0's loginWithPopup method
    if successful set user store to client.getUser()
    set isAuthenticated to true
    finally set popupOpen back to false.
add logout function
    client.logout()

export functions
 */
import { createAuth0Client } from "@auth0/auth0-spa-js";
import { popupOpen, isAuthenticated, user } from "./stores.js";
function createClient() {
  const client = createAuth0Client({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    cacheLocation: "localstorage",
    authorizationParams: {
      audience: import.meta.env.VITE_AUTH0_AUDIENCE
    }
  });
  return client;
}

async function loginWithPopup(client, options) {
  popupOpen.set(true);
  try {
    await client.loginWithPopup(options);
    user.set(await client.getUser());
    isAuthenticated.set(true);
  } catch (error) {
    console.log(error);
  } finally {
    popupOpen.set(false);
  }
}

function logout(client) {
  return client.logout();
}

const auth = {
  createClient,
  loginWithPopup,
  logout
};
export default auth;
