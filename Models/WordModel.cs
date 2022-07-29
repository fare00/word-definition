using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace word_def.Models
{
    public class WordModel
    {
        public int Id { get; set; }
        public string Word { get; set; }
        public string Sentence { get; set; }
        public string Definition { get; set; }
    }
}