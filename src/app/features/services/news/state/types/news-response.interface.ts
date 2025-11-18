import { News } from './news.interface';

export interface NewsReponse {
  data: News[];
  meta: {
    total: number;
  };
}
