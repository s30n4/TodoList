using System.Linq.Dynamic.Core;
using System.Linq;
using System.Text;
using TodoList.Application.Common.Extensions;

namespace TodoList.Application.Common.Extensions
{
    public static class QueryableExtensions
    {
        public static IQueryable<T> OrderBy<T>(this IQueryable<T> query, string orderByQueryString, bool orderByDescending)
        {
            if (!query.Any())
                return query;

            if (string.IsNullOrWhiteSpace(orderByQueryString))
            {
                return query;
            }

            var orderParams = orderByQueryString.Trim().Split(',');
            var orderQueryBuilder = new StringBuilder();

            foreach (var param in orderParams)
            {
                if (string.IsNullOrWhiteSpace(param))
                    continue;
                if (!param.EndsWith("descending") && !param.EndsWith("ascending"))
                {
                    var sortingOrder = orderByDescending ? "descending" : "ascending";

                    orderQueryBuilder.Append($"{param} {sortingOrder}, ");
                }
                else
                {
                    orderQueryBuilder.Append($"{param}, ");
                }
            }

            var orderQuery = orderQueryBuilder.ToString().TrimEnd(',', ' ');

            return query.OrderBy(orderQuery);
        }

        public static IQueryable<TSource> SkipToPage<TSource>(this IQueryable<TSource> source, int pageNumber, int pageSize)
        {
            int startRowIndex = (pageNumber - 1) * pageSize;

            return source.Skip(startRowIndex).Take(pageSize);
        }
    }

}
