import { useEffect, useRef } from "react";
import { BackHandler, SafeAreaView, StyleSheet, View } from "react-native";
import { WebView } from 'react-native-webview';

export default function Index() {
  const webviewRef = useRef(null);

  // Android: handle back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (webviewRef.current) {
          webviewRef.current.goBack();
          return true; // prevent default behavior
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "green" }}>
      {/* Native header */}
      <View style={styles.header} />

      <WebView
        ref={webviewRef}
        source={{
          uri: "https://unconsciously-ungovernmental-leon.ngrok-free.dev/wildroots"
        }}
        allowsBackForwardNavigationGestures={true}   // ← enables swipe-back on iOS
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 9,
    backgroundColor: "#0d897b",
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
