using MediatR;
using System;
using TodoList.Application.Common.Interfaces;

namespace TodoList.Application.TodoLists.Commands
{
    public class MarkAsDoneTodoListItemCommand : IRequest<ICommandResult<Unit>>
    {
        public Guid TodoListItemId { get; set; }
    }
}
