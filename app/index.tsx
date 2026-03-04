import { Stack } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Avatar, Button, Card, Modal, Portal } from "react-native-paper";
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

export default function Index() {
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
      <Stack.Screen options={{ title: "User List", headerShown: false }} />
      <Appbar
        isSearchActive={isSearchActive}
        searchQuery={searchQuery}
        showSearchHint={showSearchHint}
        onSearchToggle={handleSearchToggle}
        onChangeSearch={setSearchQuery}
      />

      <ScrollView contentContainerStyle={styles.listContent}>
        {filteredUsers.map((user, index) => (
          <Card
            key={`${user.email}-${index}`}
            mode="elevated"
            style={styles.userCard}
          >
            <Card.Content>
              <View style={styles.cardContentRow}>
                <Avatar.Image
                  size={64}
                  source={{ uri: user.photo_url }}
                  style={styles.avatar}
                />

                <View style={styles.userInfoContainer}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                </View>

                <View style={styles.cardAside}>
                  <Text style={styles.cardAsideLabel}>USER</Text>
                  <Text style={styles.cardAsideValue}>
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                </View>
              </View>

              <Button
                mode="contained-tonal"
                onPress={() => setSelectedUser(user)}
                style={styles.aboutButton}
              >
                About Me
              </Button>
            </Card.Content>
          </Card>
        ))}

        {filteredUsers.length === 0 && (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>User tidak ditemukan.</Text>
          </View>
        )}
      </ScrollView>

      <Portal>
        <Modal
          visible={selectedUser !== null}
          onDismiss={handleCloseModal}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{selectedUser?.name}</Text>
            <Pressable onPress={handleCloseModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </Pressable>
          </View>
          <Text style={styles.modalDesc}>{selectedUser?.desc}</Text>
        </Modal>
      </Portal>
    </>
  );
}
