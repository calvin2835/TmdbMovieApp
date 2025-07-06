import ProgressBar from "@/components/progressBar.tsx/progressBar";
import { icons } from "@/constants/icons";
import { useWatchlist } from "@/context/watchlistContext";
import { useGetMovieDetailsQuery } from "@/redux/movie";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getAsyncKey } from "../../asyncStorage";
import HeaderSection from "./components/headerSection";
import MovieInfoSection from "./components/movieInfoSection";

const MovieDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data: movie, isError, isLoading } = useGetMovieDetailsQuery({ id });

  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const checkWatchlist = async () => {
      if (movie == null) return;

      try {
        const listOfMovies = await getAsyncKey("watchlist");

        if (listOfMovies) {
          const watchlist = JSON.parse(listOfMovies);
          const movieExists = watchlist.some(
            // @ts-ignore
            (existingMovie) => existingMovie.id === movie.id
          );

          setIsInWatchlist(movieExists);
        }
      } catch (error) {
        console.error("Error checking the watchlist:", error);
      }
    };

    checkWatchlist();
  }, [movie]);

  const { watchlist, updateWatchlist } = useWatchlist();

  const handleToggleWatchlist = async () => {
    if (movie == null) return;

    try {
      let updatedList = [...watchlist];

      if (isInWatchlist) {
        updatedList = updatedList.filter(
          (existingMovie) => existingMovie.id !== movie.id
        );
        setIsInWatchlist(false);
      } else {
        updatedList.push(movie);
        setIsInWatchlist(true);
      }

      updateWatchlist(updatedList);
    } catch (error) {
      console.error("Error updating the watchlist:", error);
    }
  };

  if (movie === null || isError) {
    return <Text style={styles.errorText}>Error in loading movie</Text>;
  }
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <View style={styles.movieDetailContainer}>
            <HeaderSection
              title={movie?.title}
              releaseDate={movie?.release_date}
              onBackPress={() => router.back()}
            />
            <MovieInfoSection
              poster_path={movie?.poster_path}
              adult={movie?.adult}
              releaseDate={movie?.release_date}
              originCountry={movie?.origin_country}
              runtime={movie?.runtime}
              genres={movie?.genres}
              status={movie?.status}
              originalLanguage={movie?.original_language}
            />
          </View>

          <View style={styles.descriptionContainer}>
            <View style={styles.flexRow}>
              <View style={styles.scoreContainer}>
                {movie?.vote_average && (
                  <>
                    <ProgressBar voteAverage={movie.vote_average * 10} />
                    <Text style={styles.userScoreText}>User Score</Text>
                  </>
                )}
              </View>
            </View>

            <Text style={styles.taglineText}>{movie?.tagline}</Text>

            {movie?.overview && (
              <View style={styles.overviewContainer}>
                <Text style={styles.overviewTitle}>Overview</Text>
                <Text style={styles.overviewText}>{movie.overview}</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.watchListButton}
              onPress={handleToggleWatchlist}
            >
              <Image source={icons.watchlist} resizeMode="contain" />
              <Text style={styles.buttonText}>
                {isInWatchlist ? "Remove from Watch List" : "Add To Watch List"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    minHeight: "100%",
  },
  loadingContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  movieDetailContainer: {
    backgroundColor: "#008BB5",
    padding: 30,
    paddingTop: 18,
  },
  descriptionContainer: {
    flex: 1,
    backgroundColor: "#00B4E4",
    padding: 30,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  scoreContainer: {
    flexDirection: "column",
  },
  userScoreText: {
    fontSize: 24,
    marginTop: 5,
    fontWeight: "bold",
    color: "white",
  },
  taglineText: {
    fontStyle: "italic",
    fontSize: 20,
    marginTop: 24,
    color: "white",
  },
  overviewContainer: {
    marginTop: 20,
  },
  overviewTitle: {
    fontWeight: "bold",
    fontSize: 24,
    color: "white",
  },
  overviewText: {
    fontSize: 16,
    marginTop: 8,
    color: "white",
  },
  watchListButton: {
    display: "flex",
    flexDirection: "row",
    marginTop: 48,
    padding: 12,
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 12,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default MovieDetails;
