using System.Collections;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace learnRelationships.DTO
{
    public class PostForCreateDTO
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public int BlogId { get; set; }
    }

    public class PostForUpdateDTO
    {
        public string? Title { get; set; }
        public string? Content { get; set; }
    }

    public class PostDTO
    {
        public int PostId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        //public BlogDTO Blog { get; set; }
    }
}