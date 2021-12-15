using TaskList.Models;

namespace TaskList.Services.Implementation
{
    public interface ITodoService
    {
        public Task<Todo> UpdateAsync(Todo todo);
        public Task<Todo> AddAsync(Todo todo);
        public Task<bool> DeleteAsync(int id);
    }
}
