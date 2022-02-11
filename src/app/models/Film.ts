enum GENRES {
  "NEW",
  "ANIME",
  "DISNEY",
  "SCI-FI"
};

export interface Film {
  id: number,
  title: string,
  // src: string,
  // prod: string,
  // categ: string, // replace by enum
  genres: GENRES[],
};