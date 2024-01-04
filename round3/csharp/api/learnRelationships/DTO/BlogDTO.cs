using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace learnRelationships.DTO
{
    public class BlogForCreateDTO
    {
        public string Title { get; set; }
    }

    public class BlogForUpdateDTO
    {
        public string? Title { get; set; }
    }

    public class BlogDTO : BlogForCreateDTO
    {
        public int BlogId { get; set; }
        public ICollection<PostDTO> Posts { get; set; } = new List<PostDTO>();
    }
}