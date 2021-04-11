using System.Collections.Generic;
using TodoList.Application.Common.Interfaces;

namespace TodoList.Application.Common.Concretes
{
    public class PagedList<T> : IPagedList<T>
    {
        public int PageIndex { get; private set; }
        public int PageSize { get; private set; }
        public int TotalCount { get; private set; }
        public IEnumerable<T> List { get; private set; }

        public PagedList(IEnumerable<T> list, int pageIndex, int pageSize, int totalCount)
        {
            List = list;
            PageIndex = pageIndex;
            PageSize = pageSize;
            TotalCount = totalCount;
        }
    }
}
