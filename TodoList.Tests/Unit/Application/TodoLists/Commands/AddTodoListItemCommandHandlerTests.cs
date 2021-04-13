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
using TodoList.Domain.TodoListManagement.Interfaces;

namespace TodoList.Tests.Unit.Application.TodoLists.Commands
{

    [TestFixture(Description = "AddAccountAddressCommandHandler", Category = "Unit")]
    public class AddTodoListItemCommandHandlerTests
    {
        private AddTodoListItemCommandHandler subject;
        private AddTodoListItemCommand request;
        private readonly IValidator<AddTodoListItemCommand> _validator = Substitute.For<IValidator<AddTodoListItemCommand>>();
        private readonly ITodoListItemsRepository _todoListItemsRepository = Substitute.For<ITodoListItemsRepository>();

        [Test]
        public async Task Handle_WhenRequestIsValid_ShouldReturnCommandResultSuccess()
        {
            //Arrange
            var successfulValidationResult = new ValidationResult();

            _validator.ValidateAsync(Arg.Any<AddTodoListItemCommand>()).Returns(successfulValidationResult);

            request = new AddTodoListItemCommand
            {
                Name= "Todo Item Test 1",
                Description="Description",
                DueDate=DateTime.Now.Date
            };
            subject = new AddTodoListItemCommandHandler(_todoListItemsRepository, _validator);
            //Act
            var result = await subject.Handle(request, default);

            //Assert
            result.Errors.ShouldBeEmpty();
            result.IsSuccessful.ShouldBeTrue();
            result.Result.ShouldBeOfType<Guid>();
            result.Message.ShouldBe("The todo list item was added successfully");
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

            _validator.ValidateAsync(Arg.Any<AddTodoListItemCommand>()).Returns(new ValidationResult(validationErrors));

            request = new AddTodoListItemCommand();
            subject = new AddTodoListItemCommandHandler(_todoListItemsRepository, _validator);

            //Act
            var result = await subject.Handle(request, default);

            //Assert
            result.Errors.ShouldBe(validationErrors.Select(error => error.ErrorMessage));
            result.IsSuccessful.ShouldBeFalse();
            result.Result.ShouldBeOfType<Guid>();
            result.Message.ShouldBeNull();
        }
    }
}
