using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace ProiectPawB
{
    internal class Client
    {
        public int Id { get; set; }
        public string Nume { get; set; }
        public DateTime DataInregistrareAbonament { get; set; }
        public string TipAbonament { get; set; }
        public int[] Plati { get; set; }
        public string ExtraOptiune { get; set; }

        public Client(int id = 0, string nume = "-", DateTime dataInregistrareAbonament = new DateTime(), string tipAbonament = "-", int[] _Plati = null, string extraOptiune = "-")
        {
            this.Id = id;
            this.Nume = nume;
            this.DataInregistrareAbonament = dataInregistrareAbonament;
            this.TipAbonament = tipAbonament;
            this.ExtraOptiune = extraOptiune;
            if (_Plati != null)
            {
                this.Plati = new int[_Plati.Length];
                for (int i = 0; i < _Plati.Length; i++)
                {
                    this.Plati[i] = _Plati[i];
                }
            }
        }
        public override string ToString()
        {
            string strClient = $"{Id} {Nume} {DataInregistrareAbonament.ToShortDateString()} {TipAbonament} {ExtraOptiune} (";
            string strPlati = "fara plati";
            if (Plati != null) strPlati = string.Join(", ", this.Plati);
            strClient = strClient + strPlati + ")";
            return strClient;
        }
        public Client(Client src)
        {
            this.Id = src.Id;
            this.Nume = src.Nume;
            this.DataInregistrareAbonament = src.DataInregistrareAbonament;
            this.TipAbonament = src.TipAbonament;
            this.ExtraOptiune = src.ExtraOptiune;
            this.Plati = new int[src.Plati.Length];
            for (int i = 0; i < src.Plati.Length; i++)
            {
                Plati[i] = src.Plati[i];
            }
        }
        public static explicit operator int(Client cl)
        {

            return cl.Id;
        }

        public static Client operator +(Client c1, int plata)
        {
            int[] aux = c1.Plati;
            c1.Plati = new int[aux.Length + 1];
            for (int i = 0; i < aux.Length; i++)
            {
                c1.Plati[i] = aux[i];
            }
            c1.Plati[c1.Plati.Length - 1] = plata;
            return c1;
        }

        public int this[int i] { get => Plati[i]; set => Plati[i] = value; }


    }
}
