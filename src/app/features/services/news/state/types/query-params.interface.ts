export interface QueryParams {
  sortColumn: string;
  sortDirection: 'ASC' | 'DESC';
  page: number;
  pageSize: number;
  newsCategory: string;
  searchTerm: string;
  lang: string;
  [key: string]: string | number | boolean | readonly (string | number | boolean)[];
}
