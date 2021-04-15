using FluentValidation;
using TodoList.Domain.TodoListManagement.Interfaces;

namespace TodoList.Application.TodoLists.Commands
{
    public class MarkAsDoneTodoListItemCommandValidator : AbstractValidator<MarkAsDoneTodoListItemCommand>
    {
        public MarkAsDoneTodoListItemCommandValidator(ITodoListItemsRepository todoListItemsRepository)
        {

            RuleFor(model => model.TodoListItemId)
             .MustAsync((todoListItemId, cancellation) => todoListItemsRepository.AnyAsync(x => x.TodoListItemId == todoListItemId, cancellation))
           .WithMessage("The to-do item associated with this transaction was not found.");


        }
    }
}
