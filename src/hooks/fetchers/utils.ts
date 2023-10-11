export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const multiFetcher = <T>(urls: string[]): Promise<T[]> => {
  return Promise.all(urls.map(fetcher));
};
