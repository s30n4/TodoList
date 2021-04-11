using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace TodoList.Application.TodoLists.Queries
{
    public class GetTodoListsQueryHandler : IRequestHandler<GetTodoListsQuery, GetTodoListsResultDto[]>
    {
        public Task<GetTodoListsResultDto[]> Handle(GetTodoListsQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
