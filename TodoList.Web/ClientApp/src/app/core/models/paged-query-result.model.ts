export class PagedQueryResult<T> {
  public pageIndex: number;
  public pageSize: number;
  public totalCount: number;
  public list: T[];
}
