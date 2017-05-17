using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MySkillsRatingApplication.Models
{
    public class Skills
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] //specifies the database should generate integer keys when a row is inserted.
        public int ID { get; set; }
        public string Description { get; set; }
        public int Rating { get; set; }
    }
}
