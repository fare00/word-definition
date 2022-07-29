using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using word_def.Models;
using Microsoft.EntityFrameworkCore;

namespace word_def.Controllers
{
    [ApiController]
    [Route("api/words")]
    public class WordController : ControllerBase
    {
        private readonly DatabaseContext _context;
        public WordController(DatabaseContext context) => _context = context;
        private readonly HttpClient client = new HttpClient();

        [HttpGet("word-list")]
        [ProducesResponseType(typeof(IEnumerable<WordModel>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetWordList() 
        {
            var words = await _context.Words.ToListAsync();
            var newWords = words.Select(w => new { w.Id, value = w.Word });

            return Ok(newWords);
        }
        [HttpGet("audio/{word}")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAudio(string word) 
        {
            var bytes = await client.GetByteArrayAsync($"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q={word}");
            var base64Data = Convert.ToBase64String(bytes);

            return Ok($"data:audio/mpeg;base64,{base64Data}");
        }
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(WordModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var word = await _context.Words.FindAsync(id);

            if (word == null) return NotFound();

            return Ok(word);
        }
        [Authorize]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<WordModel>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Get()
        {
            var words = await _context.Words.ToListAsync();

            HttpContext.Response.Headers.Add("Access-Control-Expose-Headers", "Content-Range");
            HttpContext.Response.Headers.Add("Content-Range", "bytes 10-20/"+words.Count);

            return Ok(words);
        }
        [Authorize]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create(WordModel word)
        {
            await _context.Words.AddAsync(word);

            try { await _context.SaveChangesAsync(); } catch { return BadRequest(); }

            return CreatedAtAction(nameof(GetById), new { Id = word.Id }, word);
        }
        [Authorize]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(int id, WordModel word)
        {
            if (id != word.Id) return BadRequest();

            _context.Entry(word).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }
        [Authorize]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var word = await _context.Words.FindAsync(id);

            if (word == null) return NotFound();

            _context.Words.Remove(word);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

}
