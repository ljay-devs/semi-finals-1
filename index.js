//instantiation
//import express API framework
const express = require("express")
const app = express();
const moment = require('moment')
//importing mysql
const mysql = require("mysql")
//port number
const PORT = process.env.PORT || 6969;

const logger = (req,res,next) =>{
    // https://bpi.com.pi
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format('YYYY-MM-DD HH:mm:ss')}`)
    next()
}

app.use(logger)
app.cors(())
//connection to mysql
const connection = mysql.createConnection({
    host: "bpnljcmqomq8ymfewfpn-mysql.services.clever-cloud.com",
    user: "uwrjfuqgmug8vbsf",
    password: "LNUiDm88OQ7QnirlRfcc",
    database: "bpnljcmqomq8ymfewfpn",
});

//initilization of connection
connection.connect();


//API - REPORT
//GET request and response are the parameters
app.get("/GET/products", (req, res) =>{
    //create a query
    connection.query("SELECT * FROM product_info",(err, rows, fields)=>{
        //checking errors
        if(err) throw err;
        //response
        //key value pair
        res.json(rows);
    });
});

//API - REPORT - SEARCH
//passing the id parameter
//request - >>> front-end ID
/* app.get("/api/members/:id",(req, res)=>{
    const id=req.params.id; 
    connection.query(`SELECT * FROM userdata WHERE id='${id}'`, (err, rows, fields)=>{
        if(err) throw err;

        if(rows.length > 0){
            res.json(rows);
        }else{
            res.status(400).json({msg: `${id} id not found!`})
        }
    })
    //res.send(id);
})
 */

//POST - CREATE
app.use(express.urlencoded({extended: false}))
app.post("/POST/products", (req, res)=>{
   const {itemname, unitprice, quantity, supplier} = req.body;
    connection.query(`INSERT INTO product_info (itemName, unitPrice, quantity, supplier) VALUES ('${itemname}','${unitprice}', '${quantity}', '${supplier}')`, (err, rows, fields) =>{
        if(err) throw err;
        res.json({msg: `Successfully inserted`});
    })

})

//CRUD
//API
//PUT - UPDATE
/* app.use(express.urlencoded({ extended: false }));
app.put("/api/members", (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const gender = req.body.gender;
  const id = req.body.id;
  connection.query(
    `UPDATE userdata SET first_name='${fname}', last_name='${lname}', email='${email}', gender='${gender}' WHERE id='${id}'`,
    (err, rows, fields) => {
      if (err) throw err;
      res.json({ msg: `Successfully updated!` });
    }
  );
}); */

//DELETE API
/* app.use(express.urlencoded({ extended: false }));
app.delete("/api/members", (req, res) =>{
    const id=req.body.id;
    connection.query(`DELETE FROM userdata WHERE id='${id}'`, (err, rows, fields)=>{
        if(err) throw err
        res.json({msg: `Successfully deleted!`})
    })
})
 */



app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
})
