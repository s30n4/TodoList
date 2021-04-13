using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;

namespace TodoList.Persistence.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void ConvertDatesToUtcKind(this ModelBuilder builder)
        {
            var dateTimeConverter = new ValueConverter<DateTime, DateTime>(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

            foreach (var entityType in builder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    if (!string.Equals(property.GetColumnType(), "date") && (property.ClrType == typeof(DateTime) || property.ClrType == typeof(DateTime?)))
                        property.SetValueConverter(dateTimeConverter);
                }
            }
        }
    }
}
