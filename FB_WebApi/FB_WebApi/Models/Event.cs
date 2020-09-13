namespace FB_WebApi.Models
{
    public class Event
    {
        public string EventName { get; set; }
        public int EventTime { get; set; }
        public UserData UserData { get; set; }
        public CustomData CustomData { get; set; }
    }
}
