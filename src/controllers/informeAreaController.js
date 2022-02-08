


const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT AreaO,CodOficina  FROM oficina', (err, oficinas) => {
     if (err) {
      res.json(err);
     }
     res.render('reporteAreas', {
        data: oficinas
     });
    });
  });
};
module.exports = controller;