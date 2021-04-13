using FluentValidation;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using TodoList.Application.Common.Concretes;
using TodoList.Application.Common.Interfaces;
using TodoList.Domain.TodoListManagement.Entities;
using TodoList.Domain.TodoListManagement.Interfaces;

namespace TodoList.Application.TodoLists.Commands
{
    public class AddTodoListItemCommandHandler : IRequestHandler<AddTodoListItemCommand, ICommandResult<Guid>>
    {
        private readonly ITodoListItemsRepository _todoListItemsRepository;
        private readonly IValidator<AddTodoListItemCommand> _validator;

        public AddTodoListItemCommandHandler(ITodoListItemsRepository todoListItemsRepository
            , IValidator<AddTodoListItemCommand> validator)
        {
            _todoListItemsRepository = todoListItemsRepository;
            _validator = validator;
        }

        public async Task<ICommandResult<Guid>> Handle(AddTodoListItemCommand request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid)
                return CommandResult<Guid>.Failure(validationResult.Errors);

            var todoListItem = TodoListItem.CreateNew(request.Name,
                request.Description,
                request.DueDate);

            _todoListItemsRepository.Insert(todoListItem);

            await _todoListItemsRepository.SaveChangesAsync(cancellationToken);

            return CommandResult<Guid>.Success(todoListItem.TodoListItemId, "The todo list item was added successfully");

        }
    }
}
