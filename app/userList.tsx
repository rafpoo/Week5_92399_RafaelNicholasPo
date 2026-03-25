import { Link, Stack } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Card } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import styles from "./AppStyles";
import Appbar from "./components/Appbar";
import userData from "./data/data.json";

type User = {
  name: string;
  email: string;
  photo_url: string;
  desc: string;
};

const users = userData as User[];

// ─── Animated card component ───────────────────────────────────────────────
type AnimatedUserCardProps = {
  user: User;
  index: number;
};

const AnimatedUserCard: React.FC<AnimatedUserCardProps> = ({ user, index }) => {
  const DELAY = index * 80; // staggered: each card 80 ms later
  const DURATION = 400;

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(40);

  useEffect(() => {
    opacity.value = withDelay(DELAY, withTiming(1, { duration: DURATION }));
    translateY.value = withDelay(DELAY, withTiming(0, { duration: DURATION }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Card mode="elevated" style={styles.userCard}>
        <Link
          href={{
            pathname: "/profile",
            params: {
              userName: user.name,
              img: user.photo_url,
              email: user.email,
            },
          }}
          push
          asChild
        >
          <TouchableOpacity style={styles.userCard}>
            <Card.Content>
              <View style={styles.cardContentRow}>
                <Avatar.Image
                  size={64}
                  source={{ uri: user.photo_url }}
                  style={styles.avatar}
                />

                <View style={styles.userInfoContainer}>
                  <Text style={styles.userName} numberOfLines={1}>
                    {user.name}
                  </Text>
                  <Text style={styles.userEmail} numberOfLines={1}>
                    {user.email}
                  </Text>
                </View>

                <View style={styles.cardAside}>
                  <Text style={styles.cardAsideLabel}>USER</Text>
                  <Text style={styles.cardAsideValue}>
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </TouchableOpacity>
        </Link>
      </Card>
    </Animated.View>
  );
};

// ─── Main screen ───────────────────────────────────────────────────────────
const UserList = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showSearchHint, setShowSearchHint] = useState(true);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return users;
    }

    return users.filter((user) => {
      const nameMatch = user.name.toLowerCase().includes(query);
      const emailMatch = user.email.toLowerCase().includes(query);
      return nameMatch || emailMatch;
    });
  }, [searchQuery]);

  const handleSearchToggle = () => {
    setShowSearchHint(false);
    setIsSearchActive((prev) => {
      if (prev) {
        setSearchQuery("");
      }
      return !prev;
    });
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <Appbar
        isSearchActive={isSearchActive}
        searchQuery={searchQuery}
        showSearchHint={showSearchHint}
        onSearchToggle={handleSearchToggle}
        onChangeSearch={setSearchQuery}
      />

      <ScrollView contentContainerStyle={styles.listContent}>
        {filteredUsers.map((user, index) => (
          <AnimatedUserCard
            key={`${user.email}-${index}`}
            user={user}
            index={index}
          />
        ))}

        {filteredUsers.length === 0 && (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>User tidak ditemukan.</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default UserList;
