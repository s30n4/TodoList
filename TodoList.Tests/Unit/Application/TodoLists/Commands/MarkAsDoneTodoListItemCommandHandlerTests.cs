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
using TodoList.Tests.Unit.TestData;

namespace TodoList.Tests.Unit.Application.TodoLists.Commands
{

    [TestFixture(Description = "MarkAsDoneTodoListItemCommandHandler", Category = "Unit")]
    public class MarkAsDoneTodoListItemCommandHandlerTests
    {
        private MarkAsDoneTodoListItemCommandHandler subject;
        private MarkAsDoneTodoListItemCommand request;
        private readonly IValidator<MarkAsDoneTodoListItemCommand> _validator = Substitute.For<IValidator<MarkAsDoneTodoListItemCommand>>();
        private readonly ITodoListItemsRepository _todoListItemsRepository = Substitute.For<ITodoListItemsRepository>();

        [Test]
        public async Task Handle_WhenRequestIsValid_ShouldReturnCommandResultSuccess()
        {
            //Arrange
            var successfulValidationResult = new ValidationResult();

            _validator.ValidateAsync(Arg.Any<MarkAsDoneTodoListItemCommand>()).Returns(successfulValidationResult);

            var todoListItem = TodoListItemTestData.CreateTodoListItemTestData();

            var todoListItemId = todoListItem.TodoListItemId;

            _todoListItemsRepository.AnyAsync(Arg.Any<Expression<Func<TodoListItem, bool>>>()).Returns(true);
            _todoListItemsRepository.GetTodoListItemsByIdAsync(Arg.Any<Guid>()).Returns(todoListItem);

            request = new MarkAsDoneTodoListItemCommand
            {
                TodoListItemId = todoListItemId
            };
            subject = new MarkAsDoneTodoListItemCommandHandler(_todoListItemsRepository, _validator);
            //Act
            var result = await subject.Handle(request, default);

            //Assert
            result.Errors.ShouldBeEmpty();
            result.IsSuccessful.ShouldBeTrue();
            result.Result.ShouldBeOfType<MediatR.Unit>();
            result.Message.ShouldBe("The to-do item was done successfully");
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

            _validator.ValidateAsync(Arg.Any<MarkAsDoneTodoListItemCommand>()).Returns(new ValidationResult(validationErrors));

            request = new MarkAsDoneTodoListItemCommand();
            subject = new MarkAsDoneTodoListItemCommandHandler(_todoListItemsRepository, _validator);

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
