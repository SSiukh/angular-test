import { CategoryTranslation } from './category-translation.interface';

export interface Category {
  id: string;
  translationList: CategoryTranslation[];
}
