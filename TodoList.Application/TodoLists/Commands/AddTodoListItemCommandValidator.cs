using FluentValidation;

namespace TodoList.Application.TodoLists.Commands
{
    public class AddTodoListItemCommandValidator : AbstractValidator<AddTodoListItemCommand>
    {
        public AddTodoListItemCommandValidator()
        {
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
