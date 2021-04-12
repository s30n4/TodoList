using MediatR;
using System;
using TodoList.Application.Common.Interfaces;
using TodoList.Application.TodoLists.Dtos;

namespace TodoList.Application.TodoLists.Commands
{
    public class AddTodoListItemCommand : TodoItemDto, IRequest<ICommandResult<Guid>>
    {
    }
}
