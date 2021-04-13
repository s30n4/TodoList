using AutoMapper;
using NSubstitute;
using NUnit.Framework;
using Shouldly;
using System;
using System.Threading.Tasks;
using TodoList.Application.TodoLists.Configurations;
using TodoList.Application.TodoLists.Dtos;
using TodoList.Application.TodoLists.Queries;
using TodoList.Domain.TodoListManagement.Entities;
using TodoList.Domain.TodoListManagement.Interfaces;

namespace TodoList.Tests.Unit.Application.TodoLists.Queries
{

    [TestFixture(Description = "GetTodoListItemQueryHandler", Category = "Unit")]
    public class GetTodoListItemQueryHandlerTests
    {
        private GetTodoListItemQueryHandler subject;
        private GetTodoListItemQuery request;
        private readonly ITodoListItemsRepository _todoListItemsRepository = Substitute.For<ITodoListItemsRepository>();
        private IMapper _mapper;


        [Test]
        public async Task Handle_WhenRequestIsValid_ShouldReturnTodoItemDto()
        {
            //Arrange

            var todoListItem = new TodoListItem("Test TodoListItem 1", "Test Description TodoListItem 1", DateTime.Now);

            var todoListItemId = todoListItem.TodoListItemId;
            _todoListItemsRepository.GetTodoListItemsByIdAsync(todoListItemId).Returns(todoListItem);

            request = new GetTodoListItemQuery
            {
                TodoListItemId = todoListItemId,
            };

            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new TodoListsProfile());
            });
            _mapper = mappingConfig.CreateMapper();
 
            subject = new GetTodoListItemQueryHandler(_todoListItemsRepository, _mapper);
            //Act
            var result = await subject.Handle(request, default);

            //Assert

            var querResult = new TodoItemDto
            {
                TodoListItemId=todoListItem.TodoListItemId,
                Name = todoListItem.Name,
                Description = todoListItem.Description,
                DueDate = todoListItem.DueDate,
                CompletedOn = todoListItem.CompletedOn,
                StatusName = todoListItem.Status == TodoListItemStatuses.Pending ? "Pending" : "Done"
            };

            result.ShouldBeOfType<TodoItemDto>();
            result.ShouldBeEquivalentTo(querResult);
        }


    }
}
