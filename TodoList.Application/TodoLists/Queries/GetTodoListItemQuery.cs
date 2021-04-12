using MediatR;
using System;
using TodoList.Application.TodoLists.Dtos;

namespace TodoList.Application.TodoLists.Queries
{
    public class GetTodoListItemQuery : IRequest<TodoListItemDto>
    {
        public Guid TodoListItemId { get; set; }
       

    }
}
