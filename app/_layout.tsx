import Header from "@/components/header";
import { WatchlistProvider } from "@/context/watchlistContext";
import store from "@/redux/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import "./global.css";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <WatchlistProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="movie/[id]"
            options={{
              headerShown: true,
              header: () => <Header />,
            }}
          />
        </Stack>
      </WatchlistProvider>
    </Provider>
  );
}
