using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using TodoList.Domain.Abstracts;
using TodoList.Domain.Common.Interfaces;

namespace TodoList.Persistence.Abstracts
{
    public abstract class RepositoryBase<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly DbContextBase _dbContext;
        internal DbSet<TEntity> dbSet;
        public RepositoryBase(DbContextBase dbContext)
        {
            _dbContext = dbContext;
            dbSet = _dbContext.Set<TEntity>();

        }

        public virtual async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            SetAuditProperties();

            return await _dbContext.SaveChangesAsync(cancellationToken);
        }

        protected virtual void SetAuditProperties()
        {

            var entities = _dbContext.ChangeTracker.Entries<Entity>().Select(po => po).ToArray();

            foreach (var entry in entities)
            {
                if (entry.State != EntityState.Unchanged)
                {
                    Guid entityId = (Guid)entry.Metadata.FindPrimaryKey()
                        .Properties
                        .Select(p => entry.Property(p.Name).CurrentValue)
                        .First();

                    var entity = entry.Entity;
                    if (entry.State == EntityState.Added)
                    {

                        entity.DateCreated = DateTime.UtcNow;
                    }
                    else
                    {
                        entity.DateLastUpdated = DateTime.UtcNow;
                    }


                }
            }
        }

        public TEntity Insert(TEntity entity)
        {
            dbSet.Add(entity);


            return entity;
        }

        public void Remove(TEntity entity)
        {
            dbSet.Remove(entity);
        }


        public async Task<int> CountAsync(Expression<Func<TEntity, bool>> filter = null, CancellationToken cancellationToken = default)
        {
            IQueryable<TEntity> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }
            return await query.CountAsync(cancellationToken);
        }

        public async Task<bool> AnyAsync(Expression<Func<TEntity, bool>> filter = null, CancellationToken cancellationToken = default)
        {
            IQueryable<TEntity> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            return await query.AnyAsync(cancellationToken);
        }
    }
}
