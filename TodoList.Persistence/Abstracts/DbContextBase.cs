using Microsoft.EntityFrameworkCore;

namespace TodoList.Persistence.Abstracts
{
    public abstract class DbContextBase : DbContext
    {
 
        public DbContextBase(DbContextOptions options)
           : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }
    }
}
