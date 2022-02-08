const controller = {};

controller.list = (req, res) => {
  var person = null;
  var areaa = null;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM persona', (err, persona) => {
      person = persona;
     if (err) {
      res.json(err);
     }
  });
    conn.query('SELECT * FROM area', (err, area) => {
      areaa = area;
     if (err) {
      res.json(err);
     }
     res.render('personas', {
      person:person,
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
    const query = connection.query('INSERT INTO persona set ?', [data], (err, persona) => {
      console.log(persona)
      res.redirect('personaRoute');
    })
  })
};

controller.save1 = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO producto set ?', [data], (err, producto) => {
      console.log(producto)
      res.redirect('personaRoute');
    })
  })
};


controller.edit = (req, res) => {
  const { IdPersona } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM persona WHERE IdPersona = ?", [IdPersona], (err, rows) => {
      res.render('personas_edit', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const { IdPersona } = req.params;
  const newPersona = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE persona set ? where IdPersona = ?', [newPersona, IdPersona], (err, rows) => {
    res.redirect('/personaRoute');
  });
  });
};

controller.delete = (req, res) => {
  const { IdPersona } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM persona WHERE IdPersona = ?', [IdPersona], (err, rows) => {
      res.redirect('/personaRoute');
    });
  });
}

module.exports = controller;
