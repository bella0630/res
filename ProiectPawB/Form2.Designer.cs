namespace ProiectPawB
{
    partial class Form2
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.lblId = new System.Windows.Forms.Label();
            this.lblNume = new System.Windows.Forms.Label();
            this.lblData = new System.Windows.Forms.Label();
            this.lblTip = new System.Windows.Forms.Label();
            this.lblPlati = new System.Windows.Forms.Label();
            this.lblExtra = new System.Windows.Forms.Label();
            this.tbId = new System.Windows.Forms.TextBox();
            this.tbNume = new System.Windows.Forms.TextBox();
            this.tbData = new System.Windows.Forms.TextBox();
            this.tbTip = new System.Windows.Forms.TextBox();
            this.tbPlati = new System.Windows.Forms.TextBox();
            this.tbExtra = new System.Windows.Forms.TextBox();
            this.btnOk = new System.Windows.Forms.Button();
            this.btnCancel = new System.Windows.Forms.Button();
            this.panel1 = new System.Windows.Forms.Panel();
            this.SuspendLayout();
            // 
            // lblId
            // 
            this.lblId.AutoSize = true;
            this.lblId.Location = new System.Drawing.Point(69, 73);
            this.lblId.Name = "lblId";
            this.lblId.Size = new System.Drawing.Size(54, 16);
            this.lblId.TabIndex = 0;
            this.lblId.Text = "Id Client";
            // 
            // lblNume
            // 
            this.lblNume.AutoSize = true;
            this.lblNume.Location = new System.Drawing.Point(69, 128);
            this.lblNume.Name = "lblNume";
            this.lblNume.Size = new System.Drawing.Size(43, 16);
            this.lblNume.TabIndex = 1;
            this.lblNume.Text = "Nume";
            this.lblNume.Click += new System.EventHandler(this.label2_Click);
            // 
            // lblData
            // 
            this.lblData.AutoSize = true;
            this.lblData.Location = new System.Drawing.Point(68, 183);
            this.lblData.Name = "lblData";
            this.lblData.Size = new System.Drawing.Size(106, 16);
            this.lblData.TabIndex = 2;
            this.lblData.Text = "Data Inregistrare";
            // 
            // lblTip
            // 
            this.lblTip.AutoSize = true;
            this.lblTip.Location = new System.Drawing.Point(69, 241);
            this.lblTip.Name = "lblTip";
            this.lblTip.Size = new System.Drawing.Size(99, 16);
            this.lblTip.TabIndex = 3;
            this.lblTip.Text = "Tip Abonament";
            // 
            // lblPlati
            // 
            this.lblPlati.AutoSize = true;
            this.lblPlati.Location = new System.Drawing.Point(69, 299);
            this.lblPlati.Name = "lblPlati";
            this.lblPlati.Size = new System.Drawing.Size(163, 16);
            this.lblPlati.TabIndex = 4;
            this.lblPlati.Text = "Plati(separate prin virgula)";
            // 
            // lblExtra
            // 
            this.lblExtra.AutoSize = true;
            this.lblExtra.Location = new System.Drawing.Point(69, 365);
            this.lblExtra.Name = "lblExtra";
            this.lblExtra.Size = new System.Drawing.Size(81, 16);
            this.lblExtra.TabIndex = 5;
            this.lblExtra.Text = "Extra Optiuni";
            // 
            // tbId
            // 
            this.tbId.Location = new System.Drawing.Point(249, 70);
            this.tbId.Name = "tbId";
            this.tbId.Size = new System.Drawing.Size(74, 22);
            this.tbId.TabIndex = 6;
            this.tbId.TextChanged += new System.EventHandler(this.textBox1_TextChanged);
            // 
            // tbNume
            // 
            this.tbNume.Location = new System.Drawing.Point(249, 125);
            this.tbNume.Name = "tbNume";
            this.tbNume.Size = new System.Drawing.Size(227, 22);
            this.tbNume.TabIndex = 7;
            // 
            // tbData
            // 
            this.tbData.Location = new System.Drawing.Point(249, 177);
            this.tbData.Name = "tbData";
            this.tbData.Size = new System.Drawing.Size(156, 22);
            this.tbData.TabIndex = 8;
            // 
            // tbTip
            // 
            this.tbTip.Location = new System.Drawing.Point(249, 238);
            this.tbTip.Name = "tbTip";
            this.tbTip.Size = new System.Drawing.Size(156, 22);
            this.tbTip.TabIndex = 9;
            // 
            // tbPlati
            // 
            this.tbPlati.Location = new System.Drawing.Point(249, 296);
            this.tbPlati.Name = "tbPlati";
            this.tbPlati.Size = new System.Drawing.Size(362, 22);
            this.tbPlati.TabIndex = 10;
            // 
            // tbExtra
            // 
            this.tbExtra.Location = new System.Drawing.Point(249, 359);
            this.tbExtra.Name = "tbExtra";
            this.tbExtra.Size = new System.Drawing.Size(362, 22);
            this.tbExtra.TabIndex = 12;
            // 
            // btnOk
            // 
            this.btnOk.DialogResult = System.Windows.Forms.DialogResult.OK;
            this.btnOk.Location = new System.Drawing.Point(558, 167);
            this.btnOk.Name = "btnOk";
            this.btnOk.Size = new System.Drawing.Size(75, 23);
            this.btnOk.TabIndex = 13;
            this.btnOk.Text = "Ok";
            this.btnOk.UseVisualStyleBackColor = true;
            // 
            // btnCancel
            // 
            this.btnCancel.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.btnCancel.Location = new System.Drawing.Point(692, 167);
            this.btnCancel.Name = "btnCancel";
            this.btnCancel.Size = new System.Drawing.Size(75, 23);
            this.btnCancel.TabIndex = 14;
            this.btnCancel.Text = "Cancel";
            this.btnCancel.UseVisualStyleBackColor = true;
            // 
            // panel1
            // 
            this.panel1.Location = new System.Drawing.Point(71, 14);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(717, 443);
            this.panel1.TabIndex = 15;
            this.panel1.Paint += new System.Windows.Forms.PaintEventHandler(this.panel1_Paint);
            // 
            // Form2
            // 
            this.AcceptButton = this.btnOk;
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.CancelButton = this.btnCancel;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.panel1);
            this.Controls.Add(this.btnCancel);
            this.Controls.Add(this.btnOk);
            this.Controls.Add(this.tbExtra);
            this.Controls.Add(this.tbPlati);
            this.Controls.Add(this.tbTip);
            this.Controls.Add(this.tbData);
            this.Controls.Add(this.tbNume);
            this.Controls.Add(this.tbId);
            this.Controls.Add(this.lblExtra);
            this.Controls.Add(this.lblPlati);
            this.Controls.Add(this.lblTip);
            this.Controls.Add(this.lblData);
            this.Controls.Add(this.lblNume);
            this.Controls.Add(this.lblId);
            this.Name = "Form2";
            this.Text = "Form2";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label lblId;
        private System.Windows.Forms.Label lblNume;
        private System.Windows.Forms.Label lblData;
        private System.Windows.Forms.Label lblTip;
        private System.Windows.Forms.Label lblPlati;
        private System.Windows.Forms.Label lblExtra;
        public System.Windows.Forms.TextBox tbId;
        public System.Windows.Forms.TextBox tbNume;
        public System.Windows.Forms.TextBox tbData;
        public System.Windows.Forms.TextBox tbTip;
        public System.Windows.Forms.TextBox tbPlati;
        public System.Windows.Forms.TextBox tbExtra;
        private System.Windows.Forms.Button btnCancel;
        public System.Windows.Forms.Button btnOk;
        private System.Windows.Forms.Panel panel1;
    }
}