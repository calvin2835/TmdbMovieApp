import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

// Define types for genres and movie information
interface Genre {
  name: string;
}

interface MovieInfoProps {
  poster_path?: string | null;
  adult?: boolean;
  releaseDate?: string;
  originCountry?: string[];
  runtime?: number | null;
  genres?: Genre[];
  status?: string;
  originalLanguage?: string;
}

const MovieInfoSection: React.FC<MovieInfoProps> = ({
  poster_path,
  adult,
  releaseDate,
  originCountry = [],
  runtime,
  genres = [],
  status,
  originalLanguage,
}) => {
  const imageUri = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://placehold.co/600x400/1a1a1a/FFFFFF.png";

  return (
    <View style={styles.movieInfoContainer}>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.movieDetails}>
        <Text style={styles.movieDetailText}>
          {adult ? "Adult" : "All Ages"}
        </Text>
        <Text style={styles.movieDetailText}>
          {releaseDate} ({originCountry.join(", ")}) - {runtime} minutes
        </Text>
        <Text style={styles.movieDetailText}>
          {genres.map((genre) => genre.name).join(", ")}
        </Text>
        <Text style={styles.movieDetailText}>Status: {status}</Text>
        <Text style={styles.movieDetailText}>Language: {originalLanguage}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  movieInfoContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 150,
    width: 112,
    alignSelf: "center",
    borderRadius: 6,
  },
  movieDetails: {
    paddingLeft: 24,
    justifyContent: "space-between",
  },
  movieDetailText: {
    color: "white",
    marginBottom: 8,
    fontSize: 16,
  },
});

export default MovieInfoSection;
