import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

export const withProtectedRoute = (WrappedComponent) => {
  return (props) => {
    const { user } = useAuth();
    const navigation = useNavigation();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
      if (!user) {
        navigation.reset({
          index: 0,
          routes: [
            { 
              name: 'Tabs',
              state: {
                routes: [{ name: 'ProfileTab' }]
              }
            }
          ]
        });
      }
      setChecked(true);
    }, [user, navigation]);

    if (!checked) return null;
    return user ? <WrappedComponent {...props} /> : null;
  };
};