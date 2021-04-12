using System;
using TodoList.Domain.Abstracts;

namespace TodoList.Domain.TodoListManagement.Entities
{
    public class TodoListItem : Entity
    {
        public Guid TodoListItemId { get; private set; }

        public string Name { get; private set; }

        public string Description { get; private set; }

        public DateTime? DueDate { get; private set; }

        public TodoListItemStatuses Status { get; private set; }

        public DateTime? CompletedOn { get; private set; }

        public TodoListItem()
        {

        }

        public TodoListItem(string name, string description, DateTime? dueDate)
        {
            TodoListItemId = Guid.NewGuid();
            Name = name;
            Description = description;
            DueDate = dueDate;
            Status = TodoListItemStatuses.Pending;
        }

        public void Update(string name, string description, DateTime? dueDate)
        {
            Name = name;
            Description = description;
            DueDate = dueDate;
        }

        public void MarkAsDone()
        {
            if (!CompletedOn.HasValue)
            {
                CompletedOn = DateTime.UtcNow;
                Status = TodoListItemStatuses.Done;
            }
        }
    }
}
