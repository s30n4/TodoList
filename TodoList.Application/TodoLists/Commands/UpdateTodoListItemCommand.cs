using MediatR;
using TodoList.Application.Common.Interfaces;
using TodoList.Application.TodoLists.Dtos;

namespace TodoList.Application.TodoLists.Commands
{
    public class UpdateTodoListItemCommand : TodoItemDto, IRequest<ICommandResult<Unit>>
    {
    }
}
