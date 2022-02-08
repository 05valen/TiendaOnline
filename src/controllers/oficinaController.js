const controller = {};

controller.list = (req, res) => {
  var ofi = null;
  var areaa = null;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM oficina', (err, oficina) => {
      ofi = oficina;
     if (err) {
      res.json(err);
     }
  });
    conn.query('SELECT * FROM area', (err, area) => {
      areaa = area;
     if (err) {
      res.json(err);
     }
     res.render('oficinas', {
      ofi:ofi,
      areaa: areaa
       // data: personas
     });
    });
  });
};



controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO oficina set ?', data, (err, oficina) => {
      console.log(oficina)
      res.redirect('oficinaRoute');
    })
  })
};

controller.edit = (req, res) => {
  const { IdOficina } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM oficina WHERE IdOficina = ?", [IdOficina], (err, rows) => {
      res.render('oficinas_edit', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const { IdOficina } = req.params;
  const newOficina = req.body;
  req.getConnection((err, conn) => {
  conn.query('UPDATE oficina set ? where IdOficina = ?', [newOficina, IdOficina], (err, rows) => {
    res.redirect('/oficinaRoute');
  });
  });
};

controller.delete = (req, res) => {
  const { IdOficina } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM oficina WHERE IdOficina= ?', [IdOficina], (err, rows) => {
      res.redirect('/oficinaRoute');
    });
  });
}

module.exports = controller;
