namespace TaskList.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public string Task { get; set; } = "";
        public bool Complete { get; set; }
    }
}
