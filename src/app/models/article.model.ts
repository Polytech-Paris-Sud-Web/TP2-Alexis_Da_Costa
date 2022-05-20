export interface Article {
  id: number,
  title: string;
  content: string;
  authors: string;
}

export type ArticleCreation = Omit<Article, "id">;