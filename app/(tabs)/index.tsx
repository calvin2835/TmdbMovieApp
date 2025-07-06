import Dropdown from "@/components/dropdown/dropdown";
import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import { CategoryOptions, CategoryType } from "@/constants/dropdownValues";
import { useLazyFetchMoviesQuery } from "@/redux/movie";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getAsyncKey, saveAysncKey } from "../../asyncStorage";

const Index = () => {
  const [formState, setFormState] = useState({
    category: CategoryType.NowPlaying,
    searchQuery: "",
    isSearchActivated: false,
  });

  const { category, searchQuery, isSearchActivated } = formState;
  const [triggerFetch, { data: movies, isError, isLoading }] =
    useLazyFetchMoviesQuery();

  useEffect(() => {
    const fetchInitialData = async () => {
      const storedCategory = await getAsyncKey("category");
      const currentCategory = storedCategory ?? category;
      if (storedCategory) {
        updateFormState("category", storedCategory);
      }
      triggerFetch({ category: currentCategory, query: "" });
    };

    fetchInitialData();
  }, []);

  const updateFormState = (key: string, value: string | boolean) => {
    setFormState((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleFormChange = async (key: string, value: string | boolean) => {
    updateFormState(key, value);

    if (key === "category") {
      try {
        updateFormState("searchQuery", "");
        triggerFetch({ category: value, query: "" });
        await saveAysncKey(key, value);
      } catch (error) {
        console.error("Failed to save category to async storage:", error);
      }
    }

    if (key === "searchQuery") {
      updateFormState("isSearchActivated", !!value);
    }
  };

  const handleSearch = () => {
    triggerFetch({ category, query: searchQuery });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.dropdownContainer}>
          <Dropdown
            onChange={(value) => handleFormChange("category", value)}
            options={CategoryOptions}
            value={category}
          />
        </View>

        <View style={styles.searchBarContainer}>
          <SearchBar
            value={searchQuery}
            placeholder="Search..."
            onChangeText={(value) => handleFormChange("searchQuery", value)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={isSearchActivated ? styles.activeButton : styles.button}
            onPress={handleSearch}
          >
            <Text
              style={
                isSearchActivated ? styles.activeButtonText : styles.buttonText
              }
            >
              Search
            </Text>
          </TouchableOpacity>
        </View>

        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

        {!isLoading && !isError && movies && (
          <View style={styles.movieListContainer}>
            <FlatList
              data={movies.results}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              style={styles.flatList}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        )}

        {isError && <Text style={styles.errorText}>Error loading movies</Text>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    minHeight: "100%",
    paddingBottom: 10,
  },
  dropdownContainer: {
    marginTop: 16,
  },
  searchBarContainer: {
    marginTop: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  button: {
    backgroundColor: "#E4E4E4",
    borderRadius: 40,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
    backgroundColor: "#00B4E4",
    borderRadius: 40,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "gray",
  },
  activeButtonText: {
    color: "white",
  },
  movieListContainer: {
    flex: 1,
    marginTop: 20,
  },
  flatList: {
    marginTop: 8,
    paddingBottom: 80,
  },
  separator: {
    height: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Index;
