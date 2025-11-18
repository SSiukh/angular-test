import { Category } from './category.interface';
import { News } from './news.interface';
import { QueryParams } from './query-params.interface';

export interface NewsState {
  newsList: News[];
  categoryList: Category[];
  total: number;
  isLoading: boolean;
  queryParams: Partial<QueryParams>;
}
