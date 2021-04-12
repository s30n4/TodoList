using Microsoft.EntityFrameworkCore;
using TodoList.Domain.TodoListManagement.Entities;
using TodoList.Persistence.Abstracts;
using TodoList.Persistence.TodoListManagement.Configurations;

namespace TodoList.Persistence.TodoListManagement
{
    public class TodoListManagementDbContext : DbContextBase
    {
        public DbSet<TodoListItem> TodoListItems { get; set; }

        public TodoListManagementDbContext(DbContextOptions options)
          : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new TodoListItemConfiguration());

            base.OnModelCreating(modelBuilder);


        }
    }
}
