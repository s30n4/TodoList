using System.Linq;
using TodoList.Domain.TodoListManagement.Entities;
using TodoList.Domain.TodoListManagement.Interfaces;
using TodoList.Infrastructure.Abstracts;
using MediatR;

namespace TodoList.Infrastructure.TodoListManagement.Repositories
{
    public class TodoListItemsRepository : RepositoryBase<TodoListItem>, ITodoListItemsRepository
    {
        private readonly TodoListManagementDbContext _dbContext;
        public TodoListItemsRepository(TodoListManagementDbContext dbContext, IMediator mediator) : base(dbContext, mediator)
        {
            _dbContext = dbContext;
        }

        public void AddTodoListItem(TodoListItem todoListItem)
        {
            _dbContext.TodoListItems.Add(todoListItem);
        }

        public IQueryable<TodoListItem> GetAllTodoListItems()
        {



            return _dbContext.TodoListItems;
        }
    }
}
