using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TodoList.Domain.Common.Interfaces;
using TodoList.Domain.TodoListManagement.Entities;

namespace TodoList.Domain.TodoListManagement.Interfaces
{
    public interface ITodoListItemsRepository : IRepository<TodoListItem>
    {

        Task<IEnumerable<TodoListItem>> GetAllTodoListItemsByStatusAsync(TodoListItemStatuses status, int pageNumber, int pageSize, CancellationToken cancellationToken = default);

        Task<TodoListItem> GetTodoListItemsByIdAsync(Guid todoListItemId, CancellationToken cancellationToken = default);


    }
}
