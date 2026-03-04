import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import styles from "./AppStyles";

const Profile = () => {
  const { userName, img, email } = useLocalSearchParams<{
    userName: string;
    img: string;
    email: string;
  }>();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Avatar.Image size={64} source={{ uri: img }} style={styles.avatar} />
      <Text>{userName}&apos;s Profile</Text>
      <Text>{email}</Text>
      <Link href="/userList" push asChild>
        <Text style={{ color: "blue", marginTop: 20 }}>Go To Home Screen</Text>
      </Link>
    </View>
  );
};

export default Profile;
