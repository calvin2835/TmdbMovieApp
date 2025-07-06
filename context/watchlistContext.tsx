import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAsyncKey, saveAysncKey } from "../asyncStorage";

type WatchlistContextType = {
  watchlist: MovieDetails[];
  updateWatchlist: (newWatchlist: MovieDetails[]) => Promise<void>;
};

interface MovieDetails {
  id: number;
  title: string;
}

const defaultWatchlistContext: WatchlistContextType = {
  watchlist: [],
  updateWatchlist: async () => {},
};

const WatchlistContext = createContext<WatchlistContextType>(
  defaultWatchlistContext
);

interface WatchlistProviderProps {
  children: ReactNode;
}

export const WatchlistProvider: React.FC<WatchlistProviderProps> = ({
  children,
}) => {
  const [watchlist, setWatchlist] = useState<MovieDetails[]>([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const listOfMovies = await getAsyncKey("watchlist");
        if (listOfMovies) {
          setWatchlist(JSON.parse(listOfMovies));
        }
      } catch (error) {
        console.error("Error fetching the watchlist:", error);
      }
    };

    fetchWatchlist();
  }, []);

  const updateWatchlist = async (newWatchlist: MovieDetails[]) => {
    try {
      const jsonUpdatedList = JSON.stringify(newWatchlist);
      await saveAysncKey("watchlist", jsonUpdatedList);
      setWatchlist(newWatchlist);
    } catch (error) {
      console.error("Error updating the watchlist:", error);
    }
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, updateWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
