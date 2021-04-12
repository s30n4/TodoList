using Microsoft.EntityFrameworkCore;
using System;
using TodoList.Domain.TodoListManagement.Entities;
using TodoList.Infrastructure.Abstracts;
using TodoList.Infrastructure.TodoListManagement.Configurations;

namespace TodoList.Infrastructure.TodoListManagement
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
