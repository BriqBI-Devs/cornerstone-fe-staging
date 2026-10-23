// TEMPORARY: This is a placeholder for the favorites feature until the backend exists. Once the backend exists, this hook should be replaced with a hook that uses the favorites requests.`
import { useLocalStorage } from "./useLocalStorage";

export type FavTab = "content" | "apps" | "files";
export type FavSub = "pages" | "events";
export interface FavItem { id: string; tab: FavTab; sub?: FavSub; title: string; to?: string; meta?: string; image?: string; category?: string; date?: [string, string] }

// Local only for now; swap this hook's storage for the favourites requests once the backend exists.
export function useFavorites() {
  const [items, setItems] = useLocalStorage<FavItem[]>("cornerstone:favorites", []);
  const has = (id: string) => items.some((i) => i.id === id);
  const remove = (id: string) => setItems(items.filter((i) => i.id !== id));
  const toggle = (item: FavItem) => (has(item.id) ? remove(item.id) : setItems([...items, item]));
  return { items, has, toggle, remove };
}
