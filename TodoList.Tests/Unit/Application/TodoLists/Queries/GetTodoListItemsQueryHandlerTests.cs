using AutoMapper;
using NSubstitute;
using NUnit.Framework;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TodoList.Application.Common.Concretes;
using TodoList.Application.Common.Extensions;
using TodoList.Application.TodoLists.Configurations;
using TodoList.Application.TodoLists.Dtos;
using TodoList.Application.TodoLists.Queries;
using TodoList.Domain.TodoListManagement.Entities;
using TodoList.Domain.TodoListManagement.Interfaces;

namespace TodoList.Tests.Unit.Application.TodoLists.Queries
{

    [TestFixture(Description = "GetTodoListItemsQueryHandlerTests", Category = "Unit")]
    public class GetTodoListItemsQueryHandlerTests
    {
        private GetTodoListItemsQueryHandler subject;
        private GetTodoListItemsQuery request;
        private readonly ITodoListItemsRepository _todoListItemsRepository = Substitute.For<ITodoListItemsRepository>();
        private IMapper _mapper;

        [Test]
        public async Task Handle_WhenRequestIsValid_ShouldReturnPendingTodoListItemDto()
        {
            //Arrange

            var todoListItem1 = new TodoListItem("Test TodoListItem 1", "Test Description TodoListItem 1", DateTime.Now);
            var todoListItem2 = new TodoListItem("Test TodoListItem 2", "Test Description TodoListItem 2", DateTime.Now);
            var todoListItem3 = new TodoListItem("Test TodoListItem 3", "Test Description TodoListItem 3", DateTime.Now);

            var data = new List<TodoListItem> { todoListItem1, todoListItem2, todoListItem3 };

            request = new GetTodoListItemsQuery
            {
                PageNumber = 1,
                PageSize = 5,
                Status = 1
            };

            _todoListItemsRepository
                .GetAllTodoListItemsByStatusAsync((TodoListItemStatuses)request.Status, request.PageNumber, request.PageSize).Returns(data);
            _todoListItemsRepository
                .CountAsync(x => x.Status == (TodoListItemStatuses)request.Status).Returns(3);


            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new TodoListsProfile());
            });
            _mapper = mappingConfig.CreateMapper();

            subject = new GetTodoListItemsQueryHandler(_todoListItemsRepository, _mapper);
            //Act
            var result = await subject.Handle(request, default);

            //Assert

            var queryResult1 = new TodoListItemDto
            {
                TodoListItemId = todoListItem1.TodoListItemId,
                Name = todoListItem1.Name,
                Description = todoListItem1.Description,
                DueDate = todoListItem1.DueDate,
                CompletedOn = todoListItem1.CompletedOn,
            };

            var queryResult2 = new TodoListItemDto
            {
                TodoListItemId = todoListItem2.TodoListItemId,
                Name = todoListItem2.Name,
                Description = todoListItem2.Description,
                DueDate = todoListItem2.DueDate,
                CompletedOn = todoListItem2.CompletedOn,
            };

            var queryResult3 = new TodoListItemDto
            {
                TodoListItemId = todoListItem3.TodoListItemId,
                Name = todoListItem3.Name,
                Description = todoListItem3.Description,
                DueDate = todoListItem3.DueDate,
                CompletedOn = todoListItem3.CompletedOn,
            };


            var todoListItems = new List<TodoListItemDto> { queryResult1, queryResult2, queryResult3 };

           var results= todoListItems.ToPagedList(request.PageNumber, request.PageSize, 0);


            result.ShouldBeOfType<PagedList<TodoListItemDto>>();
            result.ShouldBeEquivalentTo(results);
        }


    }
}
