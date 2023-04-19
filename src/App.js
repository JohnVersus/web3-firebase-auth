import logo from "./logo.svg";
import "./App.css";

import { initializeApp } from "@firebase/app";
import { getMoralisAuth } from "@moralisweb3/client-firebase-auth-utils";
import { signInWithMoralis } from "@moralisweb3/client-firebase-evm-auth";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { useState } from "react";

export const app = initializeApp({
  // Add your firbase config
});

function App() {
  const [loggedInUser, setLoggedinUser] = useState();
  const signin = async () => {
    const auth = getAuth(app);
    const functions = getFunctions(app);

    const moralisAuth = getMoralisAuth(app, {
      auth,
      functions,
    });

    await signInWithMoralis(moralisAuth);

    const currentUser = auth.currentUser;
    console.log({ currentUser });
    setLoggedinUser(currentUser);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        {loggedInUser ? (
          <>
            <p>User Id: {loggedInUser.uid}</p>
            <p>User address: {loggedInUser.displayName}</p>
          </>
        ) : (
          <button onClick={signin}>Sign in with Moralis Auth</button>
        )}
      </header>
    </div>
  );
}

export default App;
