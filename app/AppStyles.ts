import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 50,
    backgroundColor: "#f5f7fb",
    alignItems: "center",
  },
  userCard: {
    borderRadius: 16,
    backgroundColor: "#ffffff",
    width: "50%",
  },
  cardContentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  userInfoContainer: {
    flex: 1,
  },
  avatar: {
    backgroundColor: "#e8eef9",
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#17233a",
  },
  userEmail: {
    marginTop: 2,
    color: "#53627c",
  },
  cardAside: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#eef3ff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardAsideLabel: {
    fontSize: 10,
    letterSpacing: 0.8,
    color: "#62708a",
    fontWeight: "600",
  },
  cardAsideValue: {
    marginTop: 2,
    fontSize: 16,
    color: "#1f2d4d",
    fontWeight: "800",
  },
  aboutButton: {
    marginTop: 12,
    alignSelf: "stretch",
    borderRadius: 10,
  },
  emptyStateContainer: {
    paddingVertical: 24,
    alignItems: "center",
  },
  emptyStateText: {
    color: "#51607a",
  },
  modalContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 14,
    width: "40%",
    alignSelf: "center",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eef2f8",
  },
  closeButtonText: {
    fontWeight: "700",
    color: "#2a3954",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#17233a",
    flex: 1,
  },
  modalDesc: {
    fontSize: 14,
    lineHeight: 21,
    color: "#2f3f5c",
  },
});

export default styles;
