using System;
using System.Collections.Generic;
using System.Linq;

namespace MySkillsRatingApplication.Models
{
    public class SkillsRepository : ISkillsRepository
    {
        private readonly SkillsContext _context;

        public SkillsRepository(SkillsContext context)
        {
            _context = context;

            if (_context.SkillSet.Count() == 0)
            {
                Add(new Skills { Description = "JavaScript", Rating = 4 });
                Add(new Skills { Description = "HTML", Rating = 2 });
                Add(new Skills { Description = "C#", Rating = 3 });
            }
        }

        public IEnumerable<Skills> GetAll()
        {
            return _context.SkillSet.ToList();
        }

        public void Add(Skills item)
        {
            _context.SkillSet.Add(item);
            _context.SaveChanges();
        }

        public Skills Find(int id)
        {
            return _context.SkillSet.FirstOrDefault(t => t.ID == id);
        }

        public void Remove(int id)
        {
            var entity = _context.SkillSet.First(t => t.ID == id);
            _context.SkillSet.Remove(entity);
            _context.SaveChanges();
        }

        public void Update(Skills item)
        {
            _context.SkillSet.Update(item);
            _context.SaveChanges();
        }
    }
}
