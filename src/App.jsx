import AppRoutes from "./routes/Routes";
import BirthdayCelebration from "./components/animations/BirthdayCelebration";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <div>
      {user && user.fechaNacimiento && (
        <BirthdayCelebration 
            userBirthDate={user.fechaNacimiento} 
            userIdentifier={user.email} 
        />
      )}
      <AppRoutes />
    </div>
  );
}

export default App;