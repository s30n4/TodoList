using MediatR;
using System;
using TodoList.Application.TodoLists.Dtos;

namespace TodoList.Application.TodoLists.Queries
{
    public class GetTodoListItemQuery : IRequest<TodoItemDto>
    {
        public Guid TodoListItemId { get; set; }
       

    }
}
