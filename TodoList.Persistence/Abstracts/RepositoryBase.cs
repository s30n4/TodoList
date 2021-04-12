using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using TodoList.Domain.Abstracts;
using TodoList.Domain.Common.Interfaces;

namespace TodoList.Persistence.Abstracts
{
    public abstract class RepositoryBase<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly DbContextBase _dbContext;
        private readonly IMediator _mediator;
        public RepositoryBase(DbContextBase dbContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;

        }

        protected async Task PublishDomainEvents()
        {
            var domainEventEntities = _dbContext.ChangeTracker.Entries<Entity>()
               .Select(po => po.Entity)
               .Where(po => po.DomainEvents.Any())
               .ToArray();

            foreach (var entity in domainEventEntities)
            {
                var events = entity.DomainEvents.ToArray();
                entity.DomainEvents.Clear();
                foreach (var domainEvent in events)
                {
                    await _mediator.Publish(domainEvent);
                }
            }
        }

        public virtual async Task<int> SaveChangesAsync()
        {
            await PublishDomainEvents();
            SetAuditProperties();

            return await _dbContext.SaveChangesAsync();
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


    }
}
