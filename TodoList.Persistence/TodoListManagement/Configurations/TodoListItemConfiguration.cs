using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TodoList.Domain.TodoListManagement.Entities;

namespace TodoList.Persistence.TodoListManagement.Configurations
{
    public class TodoListItemConfiguration : IEntityTypeConfiguration<TodoListItem>
    {
        public void Configure(EntityTypeBuilder<TodoListItem> builder)
        {
            builder.ToTable("TodoListItems")
                .HasKey(a => a.TodoListItemId);

            builder.Property(b => b.Description).HasMaxLength(500);
            builder.Property(p => p.DueDate).HasColumnType("date");

        }
    }
}
