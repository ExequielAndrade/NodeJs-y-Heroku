const express = require('express');
const routerApi = require('./routes');
const cors = require("cors");

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')
const app =  express();
const port = process.env.PORT || 3000;

app.use(express.json());
//puerto del frontend o aplicaciones relacionadas
const whiteList = ["http://localhost:8080", "https://myapp.com"];
const options = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin) || !origin){
      callback(null, true);
    } else {
      callback(new Error("no permitido"))
    }
  }
}

app.use(cors(options));

app.listen(port, () => {
  console.log("Mi port " + port);
})

app.get('/', (req, res) => {
    res.send('Hola server en express del exe');
})
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler);
/* app.get("/users", (req, res) => {
    const {limit, offset} = req.query;
    if(limit && offset){
        res.json({
            limit,
            offset
        });
    }else {
        res.send("No hay parametros")
    }
})

app.get("/categories/:categoryId/products/:productId", (req, res) =>{
    const {categoryId , productId} = req.params;
    res.json([
        {
            categoryId,
            productId,
            name: 'sss 1',
            price: 555
        },
    ]);
}); */

