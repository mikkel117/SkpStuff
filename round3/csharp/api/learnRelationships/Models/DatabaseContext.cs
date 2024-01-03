using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using learnRelationships.Models;

namespace learnRelationships.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Blog>()
                .HasMany(e => e.Posts)
                .WithOne(e => e.Blog)
                .HasForeignKey(e => e.BlogId)
                .IsRequired();
        }

        public DbSet<TodoItem> TodoItems { get; set; }

        public DbSet<learnRelationships.Models.Blog> Blog { get; set; }

        public DbSet<learnRelationships.Models.Post> Post { get; set; }
    }
}