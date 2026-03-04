import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar as PaperAppbar, Searchbar } from "react-native-paper";
import ChatButton from "./ChatButton";

type AppbarProps = {
  isSearchActive: boolean;
  searchQuery: string;
  showSearchHint: boolean;
  onSearchToggle: () => void;
  onChangeSearch: (value: string) => void;
};

const Appbar = ({
  isSearchActive,
  searchQuery,
  showSearchHint,
  onSearchToggle,
  onChangeSearch,
}: AppbarProps) => {
  return (
    <>
      <PaperAppbar.Header>
        <PaperAppbar.Content title={isSearchActive ? "Search User" : "User List"} />

        <View style={styles.actionContainer}>
          <ChatButton visible={showSearchHint} />
          <PaperAppbar.Action
            icon={isSearchActive ? "close" : "magnify"}
            onPress={onSearchToggle}
          />
        </View>
      </PaperAppbar.Header>

      {isSearchActive && (
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Cari nama atau email"
            value={searchQuery}
            onChangeText={onChangeSearch}
            autoFocus
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    paddingTop: 8,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Appbar;
