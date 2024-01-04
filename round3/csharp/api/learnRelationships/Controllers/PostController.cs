using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using learnRelationships.Models;
using learnRelationships.DTO;
using Mapster;

namespace learnRelationships.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public PostController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Post
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetPost()
        {
            if (_context.Post == null)
            {
                return NotFound();
            }
            List<Post> postList = await _context.Post.Include(p => p.Blog).ToListAsync();
            List<PostDTO> postDTOList = postList.Adapt<List<PostDTO>>();
            return Ok(postDTOList);
        }

        // GET: api/Post/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PostDTO>> GetPost(int id)
        {
            if (_context.Post == null)
            {
                return NotFound();
            }
            //var post = await _context.Post.FindAsync(id);

            List<Post> postList = await _context.Post.Include(p => p.Blog).ToListAsync();
            List<PostDTO> postDTOList = postList.Adapt<List<PostDTO>>();

            if (postList == null)
            {
                return NotFound();
            }

            return Ok(postDTOList);
        }

        // PUT: api/Post/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPost(int id, [FromBody] PostForUpdateDTO postForUpdateDTO_obj)
        {
            Post post_obj = await _context.Post.FindAsync(id);
            if (post_obj == null)
            {
                return NotFound();
            }

            if (postForUpdateDTO_obj.Title != null)
            {
                post_obj.Title = postForUpdateDTO_obj.Title;
            }

            if (postForUpdateDTO_obj.Content != null)
            {
                post_obj.Content = postForUpdateDTO_obj.Content;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Post
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Post>> PostPost(PostForCreateDTO post)
        {
            if (_context.Post == null)
            {
                return Problem("Entity set 'DatabaseContext.Post'  is null.");
            }

            Post post_obj = post.Adapt<Post>();
            _context.Post.Add(post_obj);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPost", new { id = post_obj.PostId }, post);
        }

        // DELETE: api/Post/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            if (_context.Post == null)
            {
                return NotFound();
            }
            var post = await _context.Post.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            _context.Post.Remove(post);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PostExists(int id)
        {
            return (_context.Post?.Any(e => e.PostId == id)).GetValueOrDefault();
        }
    }
}
