namespace SpaceRace.Api.Interfaces
{
    public interface IDirection
    {
        IDirection WithAct();
        Point Change(Point point);
        
        string ToString();
        
        
    }
}