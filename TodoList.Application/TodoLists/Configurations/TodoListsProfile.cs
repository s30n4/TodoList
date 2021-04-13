using AutoMapper;
using TodoList.Application.TodoLists.Dtos;
using TodoList.Domain.TodoListManagement.Entities;

namespace TodoList.Application.TodoLists.Configurations
{
    public class TodoListsProfile : Profile
    {
        public TodoListsProfile()
        {
            CreateMap<TodoListItem, TodoListItemDto>();

            CreateMap<TodoListItem, TodoItemDto>()
               .ForMember(dto => dto.StatusName, conf => conf.MapFrom(src => src.Status == TodoListItemStatuses.Pending ? "Pending" : "Done"));
        }
    }
}
