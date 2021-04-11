using Autofac;
using System.Linq;

namespace TodoList.Infrastructure
{
    public class InfrastructureModule : Module
    {
        public InfrastructureModule()
        {

        }
        protected override void Load(ContainerBuilder builder)
        {

            builder.RegisterAssemblyTypes(ThisAssembly)
                .Where(type => type.Namespace.Contains("Infrastructure"))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();
        }
    }
}
