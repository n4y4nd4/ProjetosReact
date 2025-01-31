import { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { useUserReviews } from '../../services/ReviewsService';
import ReviewCard from '../../components/ReviewCard';
import LoginForm from '../../components/LoginForm';

const { width } = Dimensions.get('window');

const ProfilePage = () => {
  const { user, login, register, logout, error } = useAuth();
  const {
    reviews,
    loading: reviewsLoading,
    error: reviewsError,
    refresh: refreshReviews,
  } = useUserReviews(user?.username);
  const [banner, setBanner] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const navigation = useNavigation();

  const pickImage = async (type) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType,
      allowsEditing: true,
      aspect: type === 'banner' ? [16, 9] : [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === 'banner') {
        setBanner(result.assets[0].uri);
      } else {
        setAvatar(result.assets[0].uri);
      }
    }
  };

  useEffect(() => {
    if (!user) {
      setBanner(null);
      setAvatar(null);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        refreshReviews();
      }
    }, [user, refreshReviews])
  );

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'ProfileTab' }],
    });
  };

  if (!user) {
    return (
      <LoginForm
        onSubmit={({ email, password, username, isLogin }) => {
          if (isLogin) {
            login(email, password);
          } else {
            register(email, password, username);
          }
        }}
        error={error}
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.banner}
          onPress={() => pickImage('banner')}>
          <Image
            source={
              banner
                ? { uri: banner }
                : require('../../assets/placeholder-banner.jpg')
            }
            style={styles.bannerImage}
            resizeMode="cover"
          />
          {!banner && (
            <View style={styles.bannerOverlay}>
              <Ionicons name="camera" size={30} color="#fff" />
              <Text style={styles.bannerText}>
                Clique para mudar seu banner
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.profileHeader}>
          <View style={styles.avatarWrapper}>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={() => pickImage('avatar')}>
              <Image
                source={
                  avatar
                    ? { uri: avatar }
                    : require('../../assets/placeholder-user.png')
                }
                style={styles.avatar}
              />
              <View style={styles.avatarOverlay}>
                <Ionicons name="camera" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.username}>{user.username}</Text>
        </View>

        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Avaliações:</Text>
          {reviewsLoading ? (
            <ActivityIndicator size="large" color="#cb6ce6" />
          ) : reviewsError ? (
            <Text style={styles.errorText}>
              Erro ao carregar avaliações: {reviewsError}
            </Text>
          ) : reviews?.length > 0 ? (
            <View style={styles.reviewsList}>
              {reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </View>
          ) : (
            <Text style={styles.noReviewsText}>
              Você ainda não fez nenhuma avaliação.
            </Text>
          )}
        </View>
        <View style={[styles.buttonContainer, { marginTop: 'auto' }]}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },

  banner: {
    width: width,
    height: 200,
    position: 'relative',
  },

  bannerImage: {
    width: '100%',
    height: '100%',
  },

  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bannerText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },

  profileHeader: {
    alignItems: 'center',
    marginTop: -40,
    marginBottom: 20,
  },

  avatarWrapper: {
    alignItems: 'center',
  },

  avatarContainer: {
    position: 'relative',
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },

  avatarOverlay: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#1976d2',
    borderRadius: 20,
    padding: 8,
  },

  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },

  reviewsSection: {
    width: '100%',
    padding: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },

  reviewsList: {
    width: '100%',
  },

  noReviewsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },

  buttonContainer: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },

  logoutButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    width: '70%',
  },

  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default ProfilePage;
