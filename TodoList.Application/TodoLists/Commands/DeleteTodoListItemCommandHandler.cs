using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TodoList.Application.Common.Concretes;
using TodoList.Application.Common.Interfaces;
using TodoList.Domain.TodoListManagement.Interfaces;

namespace TodoList.Application.TodoLists.Commands
{
    public class DeleteTodoListItemCommandHandler : IRequestHandler<DeleteTodoListItemCommand, ICommandResult<Unit>>
    {
        private readonly ITodoListItemsRepository _todoListItemsRepository;
        private readonly IValidator<DeleteTodoListItemCommand> _validator;

        public DeleteTodoListItemCommandHandler(ITodoListItemsRepository todoListItemsRepository
            , IValidator<DeleteTodoListItemCommand> validator)
        {
            _todoListItemsRepository = todoListItemsRepository;
            _validator = validator;
        }

        public async Task<ICommandResult<Unit>> Handle(DeleteTodoListItemCommand request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid)
                return CommandResult<Unit>.Failure(validationResult.Errors);

            var todoListItem = await _todoListItemsRepository
            .GetTodoListItemsByIdAsync(request.TodoListItemId, cancellationToken);

            _todoListItemsRepository.Remove(todoListItem);

            await _todoListItemsRepository.SaveChangesAsync(cancellationToken);

            return CommandResult<Unit>.Success(Unit.Value, "The todo list item was deleted successfully");

        }
    }
}
