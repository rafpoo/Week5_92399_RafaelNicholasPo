import { Link } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const Home = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Navigation List</Text>
      <Link href="/email" push asChild>
        <Button title="Go to Email Screen" />
      </Link>
      <Link href="/userList" push asChild>
        <Button title="Go to User List Screen" />
      </Link>
    </View>
  );
};

export default Home;
