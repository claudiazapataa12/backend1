import { query } from "express";
import { response } from "../helpers/Response.js";
import route from "../routes/ejempleRoute.js";

let data = [
  {
    _id: "1",
    name: "claudia",
    lastname: "zapata",
    age: 18,
  },
  {
    _id: "2",
    name: "mateo",
    lastname: "casas",
    age: 18,
  },
  {
    _id: "3",
    name: "estefania",
    lastname: "zuluaga",
    age: 18,
  },
];
const userCtrl={

}

userCtrl.getData = (req, res) => {
  try {
    response(res, 200, true, data, "lista de usuarios");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

userCtrl.getDataByid = (req, res) => {
  try {
    const { id } = req.params;
    const user = data.find((item) => item._id === id);
    if (!user) {
      return response(res, 404, false, "", "usuario no encontrado");
    }
    response(res, 200, true, user, "test");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

userCtrl.saveData = (req, res) => {
  try {
    const { _id, name, lastname, age } = req.body;
    data.push({ _id, name, lastname, age: parseInt(age) });
    response(
      res,
      201,
      true,
      {
        name,
        lastname,
        age,
      },
      "registro guardado"
    );
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};



userCtrl.actualizar = (req, res) => {
  try {
    const { id } = req.params;
    const { _id, name, lastname, age } = req.body;

    const newData = data.map((item) =>
      item._id === id ? { _id, name, lastname, age: parseInt(age) } : item
    );
    data=newData

    response(res, 200, true, id, "usuario actualizado");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};
userCtrl.eliminar = (req, res) => {
  try {
    const { id } = req.params;
    const newData = data.filter((item) => item._id !== id);
    data = newData;

    response(res, 200, true, id, "usuario elimiando");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};
 export default userCtrl;