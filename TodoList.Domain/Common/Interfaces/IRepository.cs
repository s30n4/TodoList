using System.Threading.Tasks;

namespace TodoList.Domain.Common.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task<int> SaveChangesAsync();

    }
}
