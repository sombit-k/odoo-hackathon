// frontend/src/SaveUserOnLogin.jsx
import { useAuth, useUser } from "@clerk/clerk-react";
import { axiosInstance } from "@/lib/axios";
import { useEffect } from "react";

function SaveUserOnLogin() {
  const { isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  console.log("User data:", user);

  useEffect(() => {
    if (!isSignedIn) return;

    const saveUser = async () => {
      try {
        const token = await getToken();

        const res = await axiosInstance.post(
          "/save-user",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(" User saved to backend:", res.data);
      } catch (error) {
        console.error(" Failed to save user:", error);
      }
    };

    saveUser();
  }, [isSignedIn, getToken]);

  return null;
}

export default SaveUserOnLogin;
