using System.Linq;
using TodoList.Domain.Common.Interfaces;
using TodoList.Domain.TodoListManagement.Entities;

namespace TodoList.Domain.TodoListManagement.Interfaces
{
    public interface ITodoListItemsRepository : IRepository<TodoListItem>
    {
        void AddTodoListItem(TodoListItem todoListItem);

        IQueryable<TodoListItem> GetAllTodoListItems();
    }
}
