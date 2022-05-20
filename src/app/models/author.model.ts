export type Author = {
  id: number,
  name: string;
  bio?: string;
}

export type AuthorCreation = Omit<Author, "id">;