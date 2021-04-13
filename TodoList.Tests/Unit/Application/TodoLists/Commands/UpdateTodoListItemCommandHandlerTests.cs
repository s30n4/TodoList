using FluentValidation;
using FluentValidation.Results;
using NSubstitute;
using NUnit.Framework;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoList.Application.TodoLists.Commands;
using TodoList.Domain.TodoListManagement.Entities;
using TodoList.Domain.TodoListManagement.Interfaces;
using TodoList.Tests.Unit.TestData;

namespace TodoList.Tests.Unit.Application.TodoLists.Commands
{

    [TestFixture(Description = "UpdateTodoListItemCommandHandler", Category = "Unit")]
    public class UpdateTodoListItemCommandHandlerTests
    {
        private UpdateTodoListItemCommandHandler subject;
        private UpdateTodoListItemCommand request;
        private readonly IValidator<UpdateTodoListItemCommand> _validator = Substitute.For<IValidator<UpdateTodoListItemCommand>>();
        private readonly ITodoListItemsRepository _todoListItemsRepository = Substitute.For<ITodoListItemsRepository>();
        [Test]
        public async Task Handle_WhenRequestIsValid_ShouldReturnCommandResultSuccess()
        {
            //Arrange
            var successfulValidationResult = new ValidationResult();

            _validator.ValidateAsync(Arg.Any<UpdateTodoListItemCommand>()).Returns(successfulValidationResult);

            var todoListItem = TodoListItemTestData.CreateTodoListItemTestData();

            var todoListItemId = todoListItem.TodoListItemId;

            _todoListItemsRepository.AnyAsync(x => x.TodoListItemId == todoListItemId).Returns(true);
            _todoListItemsRepository.GetTodoListItemsByIdAsync(todoListItemId).Returns(todoListItem);

            request = new UpdateTodoListItemCommand
            {
                TodoListItemId = todoListItemId,
                Name = "New Name",
                Description = "New Description",
                DueDate = DateTime.Now
            };

            subject = new UpdateTodoListItemCommandHandler(_todoListItemsRepository, _validator);
            //Act
            var result = await subject.Handle(request, default);

            //Assert
            result.Errors.ShouldBeEmpty();
            result.IsSuccessful.ShouldBeTrue();
            result.Result.ShouldBeOfType<MediatR.Unit>();
            result.Message.ShouldBe("The todo list item was updated successfully");
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

            _validator.ValidateAsync(Arg.Any<UpdateTodoListItemCommand>()).Returns(new ValidationResult(validationErrors));

            request = new UpdateTodoListItemCommand();
            subject = new UpdateTodoListItemCommandHandler(_todoListItemsRepository, _validator);

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
