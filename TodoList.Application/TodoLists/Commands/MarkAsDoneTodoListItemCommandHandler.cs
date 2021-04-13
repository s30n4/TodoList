using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TodoList.Application.Common.Concretes;
using TodoList.Application.Common.Interfaces;
using TodoList.Domain.TodoListManagement.Interfaces;

namespace TodoList.Application.TodoLists.Commands
{
    public class MarkAsDoneTodoListItemCommandHandler : IRequestHandler<MarkAsDoneTodoListItemCommand, ICommandResult<Unit>>
    {
        private readonly ITodoListItemsRepository _todoListItemsRepository;
        private readonly IValidator<MarkAsDoneTodoListItemCommand> _validator;

        public MarkAsDoneTodoListItemCommandHandler(ITodoListItemsRepository todoListItemsRepository
            , IValidator<MarkAsDoneTodoListItemCommand> validator)
        {
            _todoListItemsRepository = todoListItemsRepository;
            _validator = validator;
        }

        public async Task<ICommandResult<Unit>> Handle(MarkAsDoneTodoListItemCommand request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid)
                return CommandResult<Unit>.Failure(validationResult.Errors);


            var todoListItem = await _todoListItemsRepository
                .GetTodoListItemsByIdAsync(request.TodoListItemId, cancellationToken);

            todoListItem.MarkAsDone();

            await _todoListItemsRepository.SaveChangesAsync(cancellationToken);

            return CommandResult<Unit>.Success(Unit.Value, "The todo list item was done successfully");

        }
    }
}
