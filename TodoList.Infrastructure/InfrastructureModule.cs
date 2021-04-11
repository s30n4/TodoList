using Autofac;
using Microsoft.EntityFrameworkCore;
using System.Linq;
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


            builder.RegisterAssemblyTypes(ThisAssembly)
                .Where(type => type.Namespace.Contains("Infrastructure"))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();
        }
    }
}
