using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace myapp.classes
{
    public class Todos
    {
        private static int nextId;
        public int Id { get; private set; }
        public string Title { get; set; }
        public Boolean IsDone { get; set; }
        public Todos(string title, Boolean isDone)
        {
            Id = nextId++;
            Title = title;
            IsDone = isDone;
        }
    }
}