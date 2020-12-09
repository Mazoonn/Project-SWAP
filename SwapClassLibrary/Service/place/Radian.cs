using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwapClassLibrary.Service
{
    public class Radian
    {
        public static double DegreesToRadians(double angle)
        {
            return (angle / 180 * Math.PI);
        }
    }
}
