using AutoMapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TodoList.Domain.TodoListManagement.Interfaces;
using TodoList.Application.TodoLists.Dtos;

namespace TodoList.Application.TodoLists.Queries
{
    public class GetTodoListItemQueryHandler : IRequestHandler<GetTodoListItemQuery, TodoItemDto>
    {
        private readonly ITodoListItemsRepository _todoListItemsRepository;
        private readonly IMapper _mapper;
        public GetTodoListItemQueryHandler(ITodoListItemsRepository todoListItemsRepository, IMapper mapper)
        {
            _todoListItemsRepository = todoListItemsRepository;
            _mapper = mapper;
        }
        public async Task<TodoItemDto> Handle(GetTodoListItemQuery request, CancellationToken cancellationToken)
        {
            var query =await _todoListItemsRepository.GetTodoListItemsByIdAsync(request.TodoListItemId, cancellationToken);

            var results = _mapper
                .Map<TodoItemDto>(query);

            return results;

        }
    }
}
