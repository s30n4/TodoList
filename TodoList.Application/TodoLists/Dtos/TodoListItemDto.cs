using System;

namespace TodoList.Application.TodoLists.Dtos
{
    public class TodoListItemDto
    {
        public Guid TodoListItemId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime? DueDate { get; set; }
    }
}
