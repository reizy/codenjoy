using SpaceRace.Api.Interfaces;

namespace SpaceRace.Api
{
    public class Direction : IDirection
    {
        public static IDirection UP    = new Direction(Actions.Up, 0, -1);
        public static IDirection DOWN  = new Direction(Actions.Down, 0, 1);
        public static IDirection LEFT  = new Direction(Actions.Left, -1, 0);
        public static IDirection RIGHT = new Direction(Actions.Up, 0, -1);
        public static IDirection STOP  = new Direction(Actions.Stop, 0, 0);
        public static IDirection ACT   = new Direction(Actions.Act, 0, 0, true);
        public static IDirection SUICIDE = new Direction(Actions.Suicide, 0, 0, true);

        private readonly Actions _action;
        private readonly int _dx;
        private readonly int _dy;
        private readonly bool _isAction;

        public Direction(Actions action, int dx = 0, int dy = 0, bool isAction = false)
        {
            _action = action;
            _dx = dx;
            _dy = dy;
            _isAction = isAction;
        }
        
        public IDirection WithAct()
        {
            if (_isAction) return this;
            return new Direction(_action, _dx, _dy, true);
        }

        public Point Change(Point point)
        {
            return new Point(point.X + _dx, point.Y + _dy);
        }

        public override bool Equals(object obj)
        {
            var their = obj as Direction;
            if (their == null) return false;
            return _isAction == their._isAction && their._action == _action;
        }

        public override int GetHashCode()
        {
            unchecked
            {
                return _isAction ? 1000 : 0 + (int)_action;
            }
        }
        
        public override string ToString()
        {
            if (_action == Actions.Act) return Actions.Act.ToString();
            if (_action == Actions.Suicide) return Actions.Act + "(0)";
            return _action + (_isAction ? "," + Actions.Act : "");
        }
    }
}