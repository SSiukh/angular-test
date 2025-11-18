import { CategoryTranslation } from './category-translation.interface';
import { NewsTranslation } from './news-translation.interface';

export interface News {
  id: string;
  publishedAt: string;
  translationList: NewsTranslation[];
  newsCategory: {
    translationList: CategoryTranslation[];
  };
}
