using System;

namespace TodoList.Application.TodoLists.Dtos
{
    public class TodoItemDto
    {
        public Guid TodoListItemId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime? DueDate { get; set; }

        public DateTime? CompletedOn { get; set; }

        public string StatusName { get; set; }
    }
}
