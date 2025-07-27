function verificarRol(rolRequerido) {
  return (req, res, next) => {
    if (!req.usuario) return res.status(401).json({ mensaje: 'No autorizado.' });
    if (req.usuario.rol !== rolRequerido) {
      return res.status(403).json({ mensaje: 'Acceso denegado por rol.' });
    }
    next();
  };
}

module.exports = verificarRol;
