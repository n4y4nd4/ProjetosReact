import { RootNavigator } from './navigation/RootNavigator';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
  <AuthProvider>
  <RootNavigator />
  </AuthProvider>
  );
}