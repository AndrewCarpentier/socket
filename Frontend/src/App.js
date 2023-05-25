import { Outlet } from "react-router-dom";
import { AuthProvider } from "./provider/AuthProvider";
import './moment/fr';

function App() {
  return (
    <div>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  );
}

export default App;
