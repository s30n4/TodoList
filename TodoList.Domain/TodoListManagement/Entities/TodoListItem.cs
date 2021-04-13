using System;
using TodoList.Domain.Abstracts;
using TodoList.Domain.TodoListManagement.Rules;

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

        private TodoListItem()
        {

        }

        private TodoListItem(string name, string description, DateTime? dueDate)
        {
            this.CheckRule(new NameCanNotBeNullOrEmptyRule(name));

            this.CheckRule(new DescriptionLengthCanNotBeMoreThan500CharacterRule(description));

            TodoListItemId = Guid.NewGuid();
            Name = name;
            Description = description;
            DueDate = dueDate;
            Status = TodoListItemStatuses.Pending;
        }

        public static TodoListItem CreateNew(string name, string description, DateTime? dueDate = null)
        {
            return new TodoListItem(name, description, dueDate);
        }


        public void Update(string name, string description, DateTime? dueDate = null)
        {
            this.CheckRule(new NameCanNotBeNullOrEmptyRule(name));

            this.CheckRule(new DescriptionLengthCanNotBeMoreThan500CharacterRule(description));

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
