using System;
using System.Collections.Generic;
using TodoList.Domain.TodoListManagement.Entities;

namespace TodoList.Tests.Unit.TestData
{
    public static class TodoListItemTestData
    {
        public static TodoListItem CreateTodoListItemTestData(bool hasName = true, bool hasDescription = true, bool hasDueDate = true, string postfix = "1")
        {
            var name = hasName ? $"Test TodoListItem {postfix}" : null;
            var description = hasDescription ? $"Test Description TodoListItem {postfix}" : null;
            var dueDate = hasDueDate ? DateTime.Now : (DateTime?)null;

            return TodoListItem.CreateNew(name, description, dueDate);
        }


        public static List<TodoListItem> CreateListTodoListItemTestData(bool hasName = true, bool hasDescription = true, bool hasDueDate = true)
        {
            return new List<TodoListItem>
            {
                CreateTodoListItemTestData(hasName,hasDescription,hasDueDate,"1"),
                CreateTodoListItemTestData(hasName,hasDescription,hasDueDate,"2"),
                CreateTodoListItemTestData(hasName,hasDescription,hasDueDate,"3"),
                CreateTodoListItemTestData(hasName,hasDescription,hasDueDate,"4"),
            };

        }
    }
}
