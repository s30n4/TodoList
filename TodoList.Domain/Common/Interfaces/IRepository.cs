using System;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace TodoList.Domain.Common.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        TEntity Insert(TEntity entity);

        void Remove(TEntity entity);

        Task<int> CountAsync(Expression<Func<TEntity, bool>> filter = null, CancellationToken cancellationToken = default);

        Task<bool> AnyAsync(Expression<Func<TEntity, bool>> filter = null, CancellationToken cancellationToken = default);

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

    }
}
