using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ProiectPawB
{
    public partial class Form2 : Form
    {
        public int[] contoare2;
        public Form2()
        {
            InitializeComponent();
        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void panel1_Paint(object sender, PaintEventArgs e)
        {
            Graphics g = e.Graphics;
            Pen creion = new Pen(Brushes.Red, 2);
            Brush[] culori = new Brush[]{Brushes.Red,Brushes.Blue, Brushes.Yellow,Brushes.Green,Brushes.Gold,
                    Brushes.Ivory, Brushes.Khaki, Brushes.Magenta, Brushes.Lime, Brushes.Orange };
            int vl = panel1.ClientRectangle.X + 10, vr = panel1.ClientRectangle.Width - 10;
            int vt = panel1.ClientRectangle.Y + 10, vb = panel1.ClientRectangle.Height - 10;
            g.DrawRectangle(creion, vl, vt, vr - vl, vb - vt);
            int max = contoare2.Max();
            int scara = (vb - vt) / max; int lat = (vr - vl) / 10;
            for (int i = 0; i < contoare2.Length; i++)
            {
                g.FillRectangle(culori[i], vl + i * lat, vb - contoare2[i] * scara, lat, contoare2[i] * scara);
            }
        }
    }
}
