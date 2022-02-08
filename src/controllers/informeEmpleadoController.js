const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM persona', (err, personas) => {
     if (err) {
      res.json(err);
     }
     res.render('reporteEmpleados', {
        data: personas
     });
    });
  });
};
module.exports = controller;