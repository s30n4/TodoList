using FluentValidation;
using TodoList.Domain.TodoListManagement.Interfaces;

namespace TodoList.Application.TodoLists.Commands
{
    public class UpdateTodoListItemCommandValidator : AbstractValidator<UpdateTodoListItemCommand>
    {
        public UpdateTodoListItemCommandValidator(ITodoListItemsRepository todoListItemsRepository)
        {

            RuleFor(model => model.TodoListItemId)
               .MustAsync((todoListItemId, cancellation) => todoListItemsRepository.AnyTodoListItemsByIdAsync(todoListItemId, cancellation))
             .WithMessage("The todo list item associated with this transaction was not found.");

            RuleFor(model => model.Name)
             .NotEmpty()
             .WithMessage("Name must not be empty");

            RuleFor(model => model.Description)
             .MaximumLength(500)
             .WithMessage(model => $"Description must be less than 500 characters long. Current length: {model.Description.Length}")
             .When(model => !string.IsNullOrWhiteSpace(model.Description));

        }
    }
}
