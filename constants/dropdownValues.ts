export enum CategoryType {
  NowPlaying = "NowPlaying",
  Upcoming = "Upcoming",
  Popular = "Popular",
}

export const CategoryOptions = [
  { label: "Now Playing", value: CategoryType.NowPlaying },
  { label: "Upcoming", value: CategoryType.Upcoming },
  { label: "Popular", value: CategoryType.Popular },
];

export enum SortByType {
  Alphabetical = "Alphabetical",
  Rating = "Rating",
  Popular = "Popular",
}

export const SortByOptions = [
  { label: "Now Playing", value: SortByType.Alphabetical },
  { label: "Upcoming", value: SortByType.Rating },
  { label: "Popular", value: SortByType.Popular },
];
