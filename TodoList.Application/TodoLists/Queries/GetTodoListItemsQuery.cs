using MediatR;
using TodoList.Application.Common.Interfaces;
using TodoList.Application.TodoLists.Dtos;

namespace TodoList.Application.TodoLists.Queries
{
    public class GetTodoListItemsQuery : IRequest<IPagedList<TodoListItemDto>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SortExpression { get; set; }
        public bool OrderByDescending { get; set; }
        public int Status { get; set; }


    }
}
