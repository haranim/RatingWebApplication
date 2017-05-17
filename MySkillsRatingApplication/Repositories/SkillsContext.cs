using Microsoft.EntityFrameworkCore;

namespace MySkillsRatingApplication.Models
{
    public class SkillsContext : DbContext
    {
        public SkillsContext(DbContextOptions<SkillsContext> options): base(options)
        {
        }

        public DbSet<Skills> SkillSet { get; set; }
    }
}
