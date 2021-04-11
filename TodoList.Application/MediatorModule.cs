using Autofac;
using MediatR;
using System.Reflection;
using TodoList.Domain.Abstracts;

namespace TodoList.Application
{
    public class MediatorModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {

            builder.RegisterType<Mediator>().As<IMediator>().InstancePerLifetimeScope();
            builder.Register<ServiceFactory>(context =>
            {
                var c = context.Resolve<IComponentContext>();
                return t => c.Resolve(t);
            });
            builder.RegisterAssemblyTypes(typeof(Entity).GetTypeInfo().Assembly).AsImplementedInterfaces();
        }
    }
}
