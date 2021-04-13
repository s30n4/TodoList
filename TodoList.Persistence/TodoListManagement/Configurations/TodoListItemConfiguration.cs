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
                .HasKey(tdl => tdl.TodoListItemId);


            builder
               .Property(tdl => tdl.TodoListItemId)
               .ValueGeneratedNever();

            builder.Property(tdl => tdl.Name).IsRequired();
            builder.Property(tdl => tdl.Description).HasMaxLength(500);
            builder.Property(tdl => tdl.DueDate).HasColumnType("date");

        }
    }
}
