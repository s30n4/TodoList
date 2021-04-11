using System.Collections.Generic;

namespace TodoList.Application.Common.Interfaces
{
    public interface IPagedList<T>
    {
        int PageIndex { get; }
        int PageSize { get; }
        int TotalCount { get; }
        IEnumerable<T> List { get; }
    }
}
