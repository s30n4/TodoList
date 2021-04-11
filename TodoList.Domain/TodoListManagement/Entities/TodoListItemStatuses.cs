using System.ComponentModel;

namespace TodoList.Domain.TodoListManagement.Entities
{
    public enum TodoListItemStatuses
    {
        [Description("Pending")]
        Pending = 1,

        [Description("Done")]
        Done = 2,

     
    }
}
