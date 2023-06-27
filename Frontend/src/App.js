import styles from './App.module.scss';
import { Outlet, ScrollRestoration } from "react-router-dom";
import { AuthProvider } from "./provider/AuthProvider";
import './moment/fr';

function App() {
  return (
    <div className={`${styles.appContainer} d-flex`}>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
      <ScrollRestoration />
    </div>
  );
}

export default App;
