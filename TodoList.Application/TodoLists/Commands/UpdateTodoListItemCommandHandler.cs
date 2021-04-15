using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TodoList.Application.Common.Concretes;
using TodoList.Application.Common.Interfaces;
using TodoList.Domain.TodoListManagement.Interfaces;

namespace TodoList.Application.TodoLists.Commands
{
    public class UpdateTodoListItemCommandHandler : IRequestHandler<UpdateTodoListItemCommand, ICommandResult<Unit>>
    {
        private readonly ITodoListItemsRepository _todoListItemsRepository;
        private readonly IValidator<UpdateTodoListItemCommand> _validator;

        public UpdateTodoListItemCommandHandler(ITodoListItemsRepository todoListItemsRepository
            , IValidator<UpdateTodoListItemCommand> validator)
        {
            _todoListItemsRepository = todoListItemsRepository;
            _validator = validator;
        }

        public async Task<ICommandResult<Unit>> Handle(UpdateTodoListItemCommand request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid)
                return CommandResult<Unit>.Failure(validationResult.Errors);

            var todoListItem = await _todoListItemsRepository
                .GetTodoListItemsByIdAsync(request.TodoListItemId, cancellationToken);
               
            todoListItem.Update(request.Name, request.Description, request.DueDate);

            await _todoListItemsRepository.SaveChangesAsync(cancellationToken);

            return CommandResult<Unit>.Success(Unit.Value, "The to-do item was updated successfully");

        }
    }
}
