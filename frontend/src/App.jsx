// frontend/src/App.jsx

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";
import SaveUserButton from "./SaveUserButton";

function App() {
  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <h1>Welcome, you are signed in!</h1>
        <SaveUserButton />
        <SignOutButton />
      </SignedIn>
    </div>
  );
}

export default App;
