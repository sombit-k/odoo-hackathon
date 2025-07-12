// frontend/src/SaveUserOnLogin.jsx
import { useAuth, useUser } from "@clerk/clerk-react";
import { useUserStore } from "@/store";
import { useEffect } from "react";

function SaveUserOnLogin() {
  const { isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const { saveUser } = useUserStore();
  
  console.log("User data:", user);

  useEffect(() => {
    if (!isSignedIn) return;

    const handleSaveUser = async () => {
      try {
        const token = await getToken();
        await saveUser(token);
        console.log("User saved to backend successfully");
      } catch (error) {
        console.error("Failed to save user:", error);
      }
    };

    handleSaveUser();
  }, [isSignedIn, getToken, saveUser]);

  return null;
}

export default SaveUserOnLogin;
