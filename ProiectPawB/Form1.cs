using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace ProiectPawB
{
    public partial class Form1 : Form
    {
        Client c1 = new Client();
        Abonament a1 = new Abonament();
        Abonament[] v_abonamente1;
        Abonament[] v_abonamente2;
        List<Client> lstClient = new List<Client>() {
            new Client(1,"Popescu Vlad", new DateTime(2024,10, 5),"Nelimitat+",new int[] {30,30,30,30},"-"),
        new Client(2,"Maria Calagiu", new DateTime(2024,9, 10),"Net+",new int[] {26,20,26,26},"-"),
        new Client(1,"Cojocaru Matei", new DateTime(2024,8, 6),"Zebra+",new int[] {30,25,25,25},"-")
    };
        List<Abonament> lstAbonamente = new List<Abonament>();
        public Form1()
        {
            InitializeComponent();

            v_abonamente1 = new Abonament[]
           {
             new Abonament("Nelimitat+", 30, 10000, 100),
             new Abonament("Net+", 26, 600, 100),
             new Abonament("Zebra+", 24, 10000, 10)
           };
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void insertToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Form2 macheta = new Form2();
            DialogResult r;
            r = macheta.ShowDialog();
            if (r == DialogResult.OK)
            {
                c1.Id = int.Parse(macheta.tbId.Text);
                c1.Nume = macheta.tbNume.Text;
                c1.DataInregistrareAbonament = DateTime.Parse(macheta.tbData.Text);
                c1.TipAbonament = macheta.tbTip.Text;
                string[] platiCitite = macheta.tbPlati.Text.Split(',');
                c1.Plati = new int[platiCitite.Length];

                for (int i = 0; i < platiCitite.Length; i++)
                {
                    c1.Plati[i] = int.Parse(platiCitite[i]);
                }
                lstClient.Add(c1);
                ListViewItem itm = new ListViewItem(macheta.tbId.Text);
                itm.SubItems.Add(macheta.tbNume.Text);
                itm.SubItems.Add(macheta.tbTip.Text);
                itm.SubItems.Add(macheta.tbData.Text);
                itm.SubItems.Add(macheta.tbPlati.Text);
                lst1.Items.Add(itm);
                tbMes.Text += "\r\nFormul s-a inchis cu OK";
            }
            else
            {
                tbMes.Text += "\r\nFormul s-a inchis cu CANCEL";
            }

        }

        private void updateToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (lst1.SelectedItems.Count > 0)
            {
                ListViewItem itm = lst1.SelectedItems[0];
                int pozitie = itm.Index;
                Form2 macheta = new Form2();
                DialogResult r;
                macheta.tbId.Text = itm.Text;
                macheta.tbNume.Text = itm.SubItems[1].Text;
                macheta.tbData.Text = itm.SubItems[2].Text;
                macheta.tbTip.Text = itm.SubItems[3].Text;
                macheta.tbPlati.Text = itm.SubItems[4].Text;
                macheta.tbExtra.Text = itm.SubItems[5].Text;
                r = macheta.ShowDialog();
                if (r == DialogResult.OK)
                {
                    itm.SubItems[0].Text = macheta.tbId.Text;
                    itm.SubItems[1].Text = macheta.tbNume.Text;
                    itm.SubItems[2].Text = macheta.tbData.Text;
                    itm.SubItems[3].Text = macheta.tbTip.Text;
                    itm.SubItems[4].Text = macheta.tbPlati.Text;
                    itm.SubItems[5].Text = macheta.tbExtra.Text;

                    c1 = lstClient [pozitie];
                }
            }
        }

        private void saveToolStripMenuItem_Click(object sender, EventArgs e)
        {
            FileStream fisOut = new FileStream("Abonamente.dat", FileMode.Create);
            BinaryFormatter fmt = new BinaryFormatter();
            fmt.Serialize(fisOut, v_abonamente1);
            MessageBox.Show($"Salvat {v_abonamente1.Length} abonamente noi");
            fisOut.Close();
        }

        private void openToolStripMenuItem_Click(object sender, EventArgs e)
        {
            FileStream fisIn = new FileStream("Abonamente.dat", FileMode.Open);
            BinaryFormatter fmt = new BinaryFormatter();
            v_abonamente2 = (Abonament[])fmt.Deserialize(fisIn);
            MessageBox.Show($"Recuperat {v_abonamente2.Length} abonamente");
            fisIn.Close();
        }

        private void btnTest_Click(object sender, EventArgs e)
        {
            foreach (Abonament crt in v_abonamente2)
            {
                tbMes.Text += crt;
            }
        }

        private void previewClientiCuAbonamentNetToolStripMenuItem_Click(object sender, EventArgs e)
        {
            printPreviewDialog1.ShowDialog();
        }

        private void printPreviewDialog1_Load(object sender, EventArgs e)
        {

        }

        private void printDocument1_PrintPage(object sender, System.Drawing.Printing.PrintPageEventArgs e)
        {
            List<Client> lstAb = lstClient.Where(x => x.TipAbonament == "Net+").ToList();
            Graphics g = e.Graphics;
            String str; float y = 0;
            foreach (Client s in lstAb)
            {
                str = $"{s.Nume}   {s.TipAbonament} ";
                g.DrawString(str, Font, Brushes.Red, 10, y += 13);
            }
        }

        private void graficFrecventaAbonamenteToolStripMenuItem_Click(object sender, EventArgs e)
        {
            int[] contoare = new int[10];
            foreach (Client crt in lstClient)
            {
                contoare[(int)crt - 1]++;
            }
            for (int i = 0; i < contoare.Length; i++)
                tbMes.Text += "\r\n " + contoare[i];
            Form2 desen = new Form2();
            desen.contoare2 = contoare;
            desen.ShowDialog();
        }
    }
}
