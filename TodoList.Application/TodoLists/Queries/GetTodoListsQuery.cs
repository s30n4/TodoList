using MediatR;

namespace TodoList.Application.TodoLists.Queries
{
    public class GetTodoListsQuery : IRequest<GetTodoListsResultDto[]>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SortExpression { get; set; }
        public bool OrderByDescending { get; set; }


    }
}
