using AutoMapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TodoList.Application.Common.Extensions;
using TodoList.Application.Common.Interfaces;
using TodoList.Domain.TodoListManagement.Interfaces;
using TodoList.Application.TodoLists.Dtos;
using TodoList.Domain.TodoListManagement.Entities;
using System.Collections.Generic;

namespace TodoList.Application.TodoLists.Queries
{
    public class GetTodoListItemsQueryHandler : IRequestHandler<GetTodoListItemsQuery, IPagedList<TodoListItemDto>>
    {
        private readonly ITodoListItemsRepository _todoListItemsRepository;
        private readonly IMapper _mapper;
        public GetTodoListItemsQueryHandler(ITodoListItemsRepository todoListItemsRepository, IMapper mapper)
        {
            _todoListItemsRepository = todoListItemsRepository;
            _mapper = mapper;
        }
        public async Task<IPagedList<TodoListItemDto>> Handle(GetTodoListItemsQuery request, CancellationToken cancellationToken)
        {

            var query =await _todoListItemsRepository
                .GetAllTodoListItemsByStatusAsync((TodoListItemStatuses)request.Status, request.PageNumber, request.PageSize, cancellationToken);


            var count = await _todoListItemsRepository.CountAllTodoListItemsByStatusAsync((TodoListItemStatuses)request.Status, cancellationToken: cancellationToken);


            var results = _mapper
                .Map<List<TodoListItemDto>>(query);

            return results.ToPagedList(request.PageNumber, request.PageSize, count);

        }
    }
}
