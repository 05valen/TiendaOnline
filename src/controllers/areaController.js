const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM area', (err, areas) => {
     if (err) {
      res.json(err);
     }
     res.render('areas', {
        data: areas
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO area set ?', data, (err, area) => {
      console.log(area)
      res.redirect('areaRoute');
    })
  })
};

controller.edit = (req, res) => {
  const { CodArea } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM area WHERE CodArea = ?", [CodArea], (err, rows) => {
      res.render('areas_edit', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const { CodArea } = req.params;
  const newArea = req.body;
  req.getConnection((err, conn) => {
  conn.query('UPDATE area set ? where CodArea = ?', [newArea, CodArea], (err, rows) => {
    res.redirect('/areaRoute');
  });
  });
};

controller.delete = (req, res) => {
  const { CodArea } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM area WHERE CodArea = ?', [CodArea], (err, rows) => {
      res.redirect('/areaRoute');
    });
  });
}

module.exports = controller;
