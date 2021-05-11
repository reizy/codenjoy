namespace SpaceRace.Api.Interfaces
{
    public interface ISolver
    {
        IDirection Get(Board board);
    }
}