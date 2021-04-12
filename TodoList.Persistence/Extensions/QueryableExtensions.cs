using System.Linq;

namespace TodoList.Persistence.Extensions
{
    public static class QueryableExtensions
    {

        public static IQueryable<TSource> SkipToPage<TSource>(this IQueryable<TSource> source, int pageNumber, int pageSize)
        {
            int startRowIndex = (pageNumber - 1) * pageSize;

            return source.Skip(startRowIndex).Take(pageSize);
        }
    }

}
