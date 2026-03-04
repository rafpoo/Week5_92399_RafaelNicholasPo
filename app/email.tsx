import { Link } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";
import styles from "./AppStyles";

const Email = () => {
  return (
    <View style={styles.listContent}>
      <Text>Email List Page</Text>
      <Link href="/home" push asChild>
        <Button title="Go to Home Screen" />
      </Link>
    </View>
  );
};

export default Email;
