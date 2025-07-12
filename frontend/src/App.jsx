import { Button } from "@/components/ui/button"
import AdminPage from "./pages/AdminPage"
import Header from "./components/Header";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Header />
      <AdminPage />
    </div>
  );
}
export default App;
