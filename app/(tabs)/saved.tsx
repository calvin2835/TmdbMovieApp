import MovieCard from "@/components/movieCard";
import { useWatchlist } from "@/context/watchlistContext";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const Saved: React.FC = () => {
  const { watchlist } = useWatchlist();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Watchlist</Text>
      {watchlist.length > 0 ? (
        <FlatList
          data={watchlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              {/* @ts-ignore */}
              <MovieCard {...item} />
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>Your watchlist is empty.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  movieItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  movieTitle: {
    fontSize: 18,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Saved;
