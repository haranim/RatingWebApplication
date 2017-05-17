using System.Collections.Generic;

namespace MySkillsRatingApplication.Models
{
    public interface ISkillsRepository
    {
        void Add(Skills item);
        IEnumerable<Skills> GetAll();
        Skills Find(int ID);
        void Remove(int ID);
        void Update(Skills item);
    }
}