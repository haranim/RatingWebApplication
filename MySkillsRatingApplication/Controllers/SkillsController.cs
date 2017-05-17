using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MySkillsRatingApplication.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace MySkillsRatingApplication.Controllers
{
    [Route("api/skills")]
    public class SkillsController : Controller
    {
        private readonly ISkillsRepository _skillsRepository;

        public SkillsController(ISkillsRepository skillsRepository)
        {
            _skillsRepository = skillsRepository;
        }

        [HttpGet]
        public IEnumerable<Skills> GetALL()
        {            
            return _skillsRepository.GetAll();
        }

        [HttpGet("{id}", Name = "GetDetails")]
        public IActionResult GetByID(int id)
        {
            var skills = _skillsRepository.Find(id);
            if (skills == null) return NotFound();
            return new ObjectResult(skills); 
        }

        [HttpPost (Name = "AddSkill")]
        public IActionResult Create([FromBody]Skills item) //The [FromBody] attribute tells MVC to get the value of the item from the body of the HTTP request.
        {
            if (item == null)
            {
                return BadRequest();
            }
            _skillsRepository.Add(item);

            return new NoContentResult();
        }

        [HttpPut (Name = "UpdateSkill")]
        public IActionResult Update([FromBody]Skills item)
        {

            var skill = _skillsRepository.Find(item.ID);
            if (skill == null)
            {
                return NotFound();
            }

            skill.Description = item.Description;
            skill.Rating = item.Rating;

            _skillsRepository.Update(skill);
            return new NoContentResult();
        }

        [HttpDelete("{id}", Name = "DeleteSkill")]
        public IActionResult Delete(int id)
        {
            var skill = _skillsRepository.Find(id);
            if (skill == null)
            {
                return NotFound();
            }

            _skillsRepository.Remove(id);
            return new NoContentResult();
        }
    }
}
