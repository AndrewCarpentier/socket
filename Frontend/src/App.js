import styles from './App.module.scss';
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./provider/AuthProvider";
import './moment/fr';

function App() {
  return (
    <div className={`${styles.appContainer}`}>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  );
}

export default App;
