using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TodoList.Application.Common.Extensions;
using TodoList.Application.Common.Interfaces;
using TodoList.Domain.TodoListManagement.Interfaces;
using TodoList.Application.TodoLists.Dtos;

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

            var query = _todoListItemsRepository.GetAllTodoListItems()
                .Where(tli => tli.Status == request.Status);

            var count = await query.CountAsync(cancellationToken: cancellationToken);

            var results = await _mapper
                .ProjectTo<TodoListItemDto>(query.OrderBy(request.SortExpression, request.OrderByDescending))
                .SkipToPage(request.PageNumber, request.PageSize)
                .ToListAsync(cancellationToken: cancellationToken);

            return results.ToPagedList(request.PageNumber, request.PageSize, count);

        }
    }
}
