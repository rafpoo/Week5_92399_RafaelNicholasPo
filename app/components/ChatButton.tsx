import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

type ChatButtonProps = {
  visible: boolean;
};

const ChatButton = ({ visible }: ChatButtonProps) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const shakeX = useRef(new Animated.Value(0)).current;
  const shakeLoopRef = useRef<Animated.CompositeAnimation | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  const stopShake = () => {
    if (shakeLoopRef.current) {
      shakeLoopRef.current.stop();
      shakeLoopRef.current = null;
    }
    shakeX.setValue(0);
  };

  const startShake = () => {
    stopShake();
    shakeLoopRef.current = Animated.loop(
      Animated.sequence([
        Animated.delay(1200),
        Animated.timing(shakeX, {
          toValue: -3,
          duration: 45,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shakeX, {
          toValue: 3,
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shakeX, {
          toValue: -3,
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shakeX, {
          toValue: 2,
          duration: 70,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shakeX, {
          toValue: 0,
          duration: 50,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    );
    shakeLoopRef.current.start();
  };

  useEffect(() => {
    let mounted = true;
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (visible) {
      setShouldRender(true);
      opacity.setValue(0);
      shakeX.setValue(0);

      timer = setTimeout(() => {
        if (!mounted) {
          return;
        }

        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished && mounted) {
            startShake();
          }
        });
      }, 1000);

      return () => {
        mounted = false;
        if (timer) {
          clearTimeout(timer);
        }
        stopShake();
      };
    }

    if (timer) {
      clearTimeout(timer);
    }
    stopShake();

    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setShouldRender(false);
      }
    });

    return () => {
      mounted = false;
      if (timer) {
        clearTimeout(timer);
      }
      stopShake();
    };
  }, [opacity, shakeX, visible]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.bubble,
        {
          opacity,
          transform: [{ translateX: shakeX }],
        },
      ]}
    >
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>i</Text>
      </View>
      <Text style={styles.text}>Search users!</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: "#2f6dff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderBottomRightRadius: 4,
    marginRight: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  iconCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: "#2f6dff",
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 12,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
});

export default ChatButton;
