using Autofac;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using TodoList.Domain.TodoListManagement.Entities;
using TodoList.Infrastructure.TodoListManagement;

namespace TodoList.Infrastructure
{
    public class InfrastructureModule : Module
    {
        public InfrastructureModule()
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

            dbContext.TodoListItems.Add(new TodoListItem("Test 1", "Description 1", DateTime.Now));
            dbContext.TodoListItems.Add(new TodoListItem("Test 2", "Description 2", DateTime.Now));
            dbContext.TodoListItems.Add(new TodoListItem("Test 3", "Description 3", DateTime.Now));

            var todoListItem4 = new TodoListItem("Test 4", "Description 4", DateTime.Now);
            todoListItem4.MarkAsDone();

            dbContext.TodoListItems.Add(todoListItem4);
            dbContext.TodoListItems.Add(new TodoListItem("Test 5", "Description 5", DateTime.Now));

            var todoListItem6 = new TodoListItem("Test 6", "Description 6", DateTime.Now);
            todoListItem6.MarkAsDone();
            dbContext.TodoListItems.Add(todoListItem6);

            dbContext.TodoListItems.Add(new TodoListItem("Test 7", "Description 7", DateTime.Now));
            dbContext.TodoListItems.Add(new TodoListItem("Test 8", "Description 8", DateTime.Now));
            dbContext.TodoListItems.Add(new TodoListItem("Test 9", "Description 9", DateTime.Now));
            dbContext.TodoListItems.Add(new TodoListItem("Test 10", "Description 10", DateTime.Now));
            dbContext.SaveChanges();

            builder.RegisterAssemblyTypes(ThisAssembly)
                .Where(type => type.Namespace.Contains("Infrastructure"))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();
        }
    }
}
