const { Router } = require("express");
const crypto = require("crypto");
const router = Router();
const neo4j = require("neo4j-driver");

//const uri = 'bolt://localhost'
const driver = neo4j.driver(
  "neo4j://localhost:7687",
  neo4j.auth.basic("neo4j", "passWord_10")
);

//Inicio
router.get("/", async (req, res) => {
  res.json({ mensaje: "Servidor 1" });
});

router.post("/registro-doctor", async (req, res) => {
  const session = driver.session({
    database: "neo4j",
  });

  try {
    const { Nombre, Foto, Correo, Edad, Especialidad, Contrasena } = req.body;
    console.log(Nombre, Foto, Correo, Edad, Especialidad, Contrasena);
    const result = await session.run(
      "CREATE (d:Doctor {nombre: $Nombre, foto: $Foto, correo: $Correo, edad: $Edad, especialidad: $Especialidad, password: $Contrasena}) RETURN d",
      { Nombre, Foto, Correo, Edad, Especialidad, Contrasena }
    );
    const createDoctor = result.records[0].get("d").properties;
    res.json({ success: true, doctor: createDoctor });
  } catch (error) {
    console.error("Error al registrar el doctor:", error);
    res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  } finally {
    await session.close();
  }
});
router.post("/login", async (req, res) => {
  const session = driver.session({
    database: "neo4j",
  });
  try {
    const { Correo, Contrasena } = req.body;
    console.log(Correo, Contrasena);
    const hashedPassword = crypto
      .createHash("sha256")
      .update(Contrasena)
      .digest("hex");
    const result = await session.run(
      "MATCH (d:Doctor {correo: $Correo, password: $Contrasena}) RETURN d",
      { Correo, Contrasena: hashedPassword }
    );
    if(result.records.length > 0){
        const doctor = result.records[0].get('d').properties;
        res.json({success:true, message: 'Login exitoso', doctor})
    }else{
        res.status(401).json({success: false, error:'Credenciales incorrectas'})
    }
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  } finally{
    await session.close()
  }
});

router.get('/obtenerDoctor/:Correo', async(req,res)=>{
    const session = driver.session({
        database: "neo4j",
      });
      try {
        const correo = req.params.Correo;
    
        const result = await session.run(
          'MATCH (d:Doctor {correo: $correo}) RETURN d',
          { correo }
        );
    
        if (result.records.length > 0) {
          const doctor = result.records[0].get('d').properties;
          res.json({ success: true, doctor });
        } else {
          res.status(404).json({ success: false, error: 'Doctor no encontrado' });
        }
      } catch (error) {
        console.error('Error al obtener la información del doctor:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
      } finally {
        await session.close();
      }
})

module.exports = router;
