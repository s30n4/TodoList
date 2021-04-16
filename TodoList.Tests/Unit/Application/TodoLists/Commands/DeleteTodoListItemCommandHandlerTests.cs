using FluentValidation;
using FluentValidation.Results;
using NSubstitute;
using NUnit.Framework;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TodoList.Application.TodoLists.Commands;
using TodoList.Domain.TodoListManagement.Entities;
using TodoList.Domain.TodoListManagement.Interfaces;

namespace TodoList.Tests.Unit.Application.TodoLists.Commands
{

    [TestFixture(Description = "DeleteTodoListItemCommandHandler", Category = "Unit")]
    public class DeleteTodoListItemCommandHandlerTests
    {
        private DeleteTodoListItemCommandHandler subject;
        private DeleteTodoListItemCommand request;
        private readonly IValidator<DeleteTodoListItemCommand> _validator = Substitute.For<IValidator<DeleteTodoListItemCommand>>();
        private readonly ITodoListItemsRepository _todoListItemsRepository = Substitute.For<ITodoListItemsRepository>();

        [Test]
        public async Task Handle_WhenRequestIsValid_ShouldReturnCommandResultSuccess()
        {
            //Arrange
            var successfulValidationResult = new ValidationResult();

            _validator.ValidateAsync(Arg.Any<DeleteTodoListItemCommand>()).Returns(successfulValidationResult);
            var todoListItemId = Guid.NewGuid();

            _todoListItemsRepository.AnyAsync(Arg.Any<Expression<Func<TodoListItem, bool>>>()).Returns(true);

            request = new DeleteTodoListItemCommand
            {
                TodoListItemId = todoListItemId
            };
            subject = new DeleteTodoListItemCommandHandler(_todoListItemsRepository, _validator);
            //Act
            var result = await subject.Handle(request, default);

            //Assert
            result.Errors.ShouldBeEmpty();
            result.IsSuccessful.ShouldBeTrue();
            result.Result.ShouldBeOfType<MediatR.Unit>();
            result.Message.ShouldBe("The to-do item was deleted successfully");
        }

        [Test]
        public async Task Handle_WhenValidationFails_ShouldReturnCommandResultFailure()
        {
            //Arrange
            var validationErrors = new List<ValidationFailure>
            {
                new ValidationFailure("PropertyName", "A validation error message"),
                new ValidationFailure("PropertyName2", "Another validation error message")
            };
            var successfulValidationResult = new ValidationResult(validationErrors);

            _validator.ValidateAsync(Arg.Any<DeleteTodoListItemCommand>()).Returns(new ValidationResult(validationErrors));

            request = new DeleteTodoListItemCommand();
            subject = new DeleteTodoListItemCommandHandler(_todoListItemsRepository, _validator);

            //Act
            var result = await subject.Handle(request, default);

            //Assert
            result.Errors.ShouldBe(validationErrors.Select(error => error.ErrorMessage));
            result.IsSuccessful.ShouldBeFalse();
            result.Result.ShouldBeOfType<MediatR.Unit>();
            result.Message.ShouldBeNull();
        }
    }
}
