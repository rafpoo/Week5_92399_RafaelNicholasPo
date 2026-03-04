import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const Profile = () => {
  const { userName } = useLocalSearchParams<{ userName: string }>();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{userName}&apos;s Profile</Text>
      <Link href="/home" push asChild>
        <Button title="Go to Home Screen" />
      </Link>
    </View>
  );
};

export default Profile;
