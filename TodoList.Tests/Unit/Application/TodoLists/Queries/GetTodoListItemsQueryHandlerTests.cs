using AutoMapper;
using NSubstitute;
using NUnit.Framework;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TodoList.Application.Common.Concretes;
using TodoList.Application.Common.Extensions;
using TodoList.Application.TodoLists.Configurations;
using TodoList.Application.TodoLists.Dtos;
using TodoList.Application.TodoLists.Queries;
using TodoList.Domain.TodoListManagement.Entities;
using TodoList.Domain.TodoListManagement.Interfaces;
using TodoList.Tests.Unit.TestData;

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
            var data = TodoListItemTestData.CreateListTodoListItemTestData();

            request = new GetTodoListItemsQuery
            {
                PageNumber = 1,
                PageSize = 5,
                Status = 1
            };

            _todoListItemsRepository.CountAsync(Arg.Any<Expression<Func<TodoListItem, bool>>>()).Returns(data.Count);

            _todoListItemsRepository
                .GetAllTodoListItemsByStatusAsync(Arg.Any<TodoListItemStatuses>(), Arg.Any<int>(), Arg.Any<int>()).Returns(data);




            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new TodoListsProfile());
            });
            _mapper = mappingConfig.CreateMapper();

            subject = new GetTodoListItemsQueryHandler(_todoListItemsRepository, _mapper);
            //Act
            var result = await subject.Handle(request, default);

            //Assert

            var todoListItems = new List<TodoListItemDto>();

            foreach (var item in data)
            {
                todoListItems.Add(new TodoListItemDto
                {
                    TodoListItemId = item.TodoListItemId,
                    Name = item.Name,
                    Description = item.Description,
                    DueDate = item.DueDate,
                    CompletedOn = item.CompletedOn,
                });
            }

            var results = todoListItems.ToPagedList(request.PageNumber, request.PageSize, data.Count);


            result.ShouldBeOfType<PagedList<TodoListItemDto>>();
            result.ShouldBeEquivalentTo(results);
        }


    }
}
