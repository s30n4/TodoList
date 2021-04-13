using System.Linq;
using TodoList.Domain.TodoListManagement.Entities;
using TodoList.Domain.TodoListManagement.Interfaces;
using MediatR;
using TodoList.Persistence.Abstracts;
using System;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using TodoList.Persistence.Extensions;
using System.Threading;

namespace TodoList.Persistence.TodoListManagement.Repositories
{
    public class TodoListItemsRepository : RepositoryBase<TodoListItem>, ITodoListItemsRepository
    {
        public TodoListItemsRepository(TodoListManagementDbContext dbContext, IMediator mediator) : base(dbContext, mediator)
        {
        }
        public async Task<IEnumerable<TodoListItem>> GetAllTodoListItemsByStatusAsync(TodoListItemStatuses status, int pageNumber, int pageSize, CancellationToken cancellationToken)
        {
            return await dbSet.AsNoTracking().Where(tli => tli.Status == status)
                .OrderBy(tli => tli.DueDate).ThenBy(tli => tli.Name)
                .SkipToPage(pageNumber, pageSize)
                .ToListAsync(cancellationToken: cancellationToken);
        }

        public async Task<TodoListItem> GetTodoListItemsByIdAsync(Guid todoListItemId, CancellationToken cancellationToken)
        {
            return await dbSet.SingleAsync(tdl => tdl.TodoListItemId == todoListItemId, cancellationToken: cancellationToken);
        }

    }
}
