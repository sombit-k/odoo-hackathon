// frontend/src/SaveUserButton.jsx

import { useAuth } from "@clerk/clerk-react";
import { useUserStore } from "@/store";

function SaveUserButton() {
  const { getToken } = useAuth();
  const { saveUser, loading } = useUserStore();

  const handleSaveUser = async () => {
    console.log("user being saved");
    try {
      const token = await getToken();
      await saveUser(token);
      console.log("User saved successfully");
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  return (
    <button 
      onClick={handleSaveUser} 
      disabled={loading}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
    >
      {loading ? "Saving..." : "Save User to MongoDB"}
    </button>
  );
}

export default SaveUserButton;
