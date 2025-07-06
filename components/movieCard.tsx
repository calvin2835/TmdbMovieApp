import { Link, useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  poster_path,
  title,
  release_date,
  overview,
}: Movie) => {
  const router = useRouter();

  const imageUri = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://placehold.co/600x400/1a1a1a/FFFFFF.png";

  const navigateToMovieDetails = (movieId: string) => {
    router.push(`/movie/${movieId}`);
  };

  return (
    <Link style={styles.container} href={`/movie/${id}`}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          navigateToMovieDetails(id.toString());
        }}
      >
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="stretch"
        />

        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.description}>{release_date}</Text>
          <Text style={styles.overview} numberOfLines={2}>
            {overview}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#E3E3E3",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    marginBottom: 10,
    backgroundColor: "white",
    marginRight: 1,
  },
  touchable: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    width: 100,
    height: 140,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 8,
  },
  description: {
    marginTop: 6,
    color: "#999999",
  },
  overview: {
    marginTop: 6,
  },
});

export default MovieCard;
