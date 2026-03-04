import { Link, Stack } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ title: "Welcome", headerShown: false }} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Link href="/home">GO TO NAVIGATION LIST</Link>
      </View>
    </>
  );
}
