const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM salon', (err, salones) => {
     if (err) {
      res.json(err);
     }
     res.render('salones', {
        data: salones
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO salon set ?', data, (err, salones) => {
      res.redirect('salonRoute');
    })
  })
};

controller.edit = (req, res) => {
  const { Consecutivo } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM salon WHERE Consecutivo = ?", [Consecutivo], (err, rows) => {
      res.render('salon_edit', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const { Consecutivo } = req.params;
  const newSalon = req.body;
  req.getConnection((err, conn) => {
  conn.query('UPDATE salon set ? where Consecutivo = ?', [newSalon, Consecutivo], (err, rows) => {
    res.redirect('/salonRoute');
  });
  });
};

controller.delete = (req, res) => {
  const { Consecutivo } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM salon WHERE Consecutivo = ?', [Consecutivo], (err, rows) => {
      res.redirect('/salonRoute');
    });
  });
}

module.exports = controller;
