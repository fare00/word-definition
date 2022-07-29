using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace word_def.Models
{
    public class DatabaseContext : DbContext
    {
        public DbSet<WordModel> Words {get; set;}
        public DatabaseContext(DbContextOptions<DatabaseContext> options):base(options){}
    }
}