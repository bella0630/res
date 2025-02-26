using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProiectPawB
{
    internal class Abonament
    {
        public string Nume { get; set; }
        public int Pret { get; set; }
        public int NumarMinute { get; set; }
        public int NumarGB { get; set; }

        public Abonament(string nume = "-", int pret = 0, int nrMin = 0, int nrGB = 0)
        {
            this.Nume = nume;
            this.Pret = pret;
            this.NumarMinute = nrMin;
            this.NumarGB = nrGB;
        }

        public override string ToString()
        {
            string strAbonament = $"{Nume} {Pret}  {NumarMinute} {NumarGB}";
            return strAbonament;
        }

        public Abonament(Abonament src)
        {
            this.Nume = src.Nume;
            this.Pret = src.Pret;
            this.NumarMinute = src.NumarMinute;
            this.NumarGB = src.NumarGB;
        }

    }
}
