using TaskList.Models;
using TaskList.Services.Implementation;

namespace TaskList.Services
{
    public class Todoservice : ITodoService
    {
        public Task<Todo> UpdateAsync(Todo todo)
        {
            return Task.FromResult(todo);
        }

        public Task<Todo> AddAsync(Todo todo)
        {
            return Task.FromResult(todo);
        }

        public Task<bool> DeleteAsync(int id)
        {
            return Task.FromResult(true);
        }
    }
}
