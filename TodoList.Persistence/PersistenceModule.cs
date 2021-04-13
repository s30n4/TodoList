using Autofac;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using TodoList.Domain.TodoListManagement.Entities;
using TodoList.Persistence.TodoListManagement;

namespace TodoList.Persistence
{
    public class PersistenceModule : Module
    {
        public PersistenceModule()
        {
        }
        protected override void Load(ContainerBuilder builder)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DbContext>()
                .UseInMemoryDatabase(databaseName: "MockDB");

            builder
               .RegisterType<TodoListManagementDbContext>()
               .WithParameter(new TypedParameter(typeof(DbContextOptions), optionsBuilder.Options))
               .InstancePerLifetimeScope();


            var dbContext = new TodoListManagementDbContext(optionsBuilder.Options);

            dbContext.TodoListItems.Add(TodoListItem.CreateNew("Test 1", "Description 1", DateTime.Now));
            dbContext.TodoListItems.Add(TodoListItem.CreateNew("Test 2", "Description 2", DateTime.Now));
            dbContext.TodoListItems.Add(TodoListItem.CreateNew("Test 3", "Description 3", DateTime.Now));

            var todoListItem4 = TodoListItem.CreateNew("Test 4", "Description 4", DateTime.Now);
            todoListItem4.MarkAsDone();

            dbContext.TodoListItems.Add(todoListItem4);
            dbContext.TodoListItems.Add(TodoListItem.CreateNew("Test 5", "Description 5", DateTime.Now));

            var todoListItem6 = TodoListItem.CreateNew("Test 6", "Description 6", DateTime.Now);
            todoListItem6.MarkAsDone();
            dbContext.TodoListItems.Add(todoListItem6);

            dbContext.TodoListItems.Add(TodoListItem.CreateNew("Test 7", "Description 7", DateTime.Now));
            dbContext.TodoListItems.Add(TodoListItem.CreateNew("Test 8", "Description 8", DateTime.Now));
            dbContext.TodoListItems.Add(TodoListItem.CreateNew("Test 9", "Description 9", DateTime.Now));
            dbContext.TodoListItems.Add(TodoListItem.CreateNew("Test 10", "Description 10", DateTime.Now));
            dbContext.SaveChanges();

            builder.RegisterAssemblyTypes(ThisAssembly)
                .Where(type => type.Namespace.Contains("Persistence"))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();
        }
    }
}
