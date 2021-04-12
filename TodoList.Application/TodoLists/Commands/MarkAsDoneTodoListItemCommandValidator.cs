using FluentValidation;
using TodoList.Domain.TodoListManagement.Interfaces;

namespace TodoList.Application.TodoLists.Commands
{
    public class MarkAsDoneTodoListItemCommandValidator : AbstractValidator<MarkAsDoneTodoListItemCommand>
    {
        public MarkAsDoneTodoListItemCommandValidator(ITodoListItemsRepository todoListItemsRepository)
        {

            RuleFor(model => model.TodoListItemId)
             .MustAsync((todoListItemId, cancellation) => todoListItemsRepository.AnyTodoListItemsByIdAsync(todoListItemId, cancellation))
           .WithMessage("The todo list item associated with this transaction was not found.");


        }
    }
}
