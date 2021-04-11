using System.Collections.Generic;
using TodoList.Application.Common.Concretes;
using TodoList.Application.Common.Interfaces;

namespace TodoList.Application.Common.Extensions
{
    public static class PagedListExtensions
    {
        public static IPagedList<T> ToPagedList<T>(this IEnumerable<T> list, int pageIndex, int pageSize, int totalCount)
        {
            return new PagedList<T>(list, pageIndex, pageSize, totalCount);
        }
    }
}
