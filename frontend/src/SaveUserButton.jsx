// frontend/src/SaveUserButton.jsx

import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

function SaveUserButton() {
  const { getToken } = useAuth();

  const handleSaveUser = async () => {
    const token = await getToken();

    const res = await axios.post(
      "http://localhost:3000/api/save-user",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);
  };

  return <button onClick={handleSaveUser}>Save User to MongoDB</button>;
}

export default SaveUserButton;
