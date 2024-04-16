let express=require("express");
let mysql=require("mysql");
const bodyParser=require('body-parser');

let app=express();
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));

let db=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"shubhji",
    database:"database2"
})

db.connect((err)=>{
    if(err) throw err;
    else{
        console.log("database is connected");
    }
})



app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.static('style'));
app.get('/',(req,res)=>{
    res.render('form')
})

app.post("/",(req,res)=>{
  let username=req.body.username;
  let address=req.body.address;
  let email=req.body.email;
  let age=req.body.age;

let value=[[username,address,email,age]];

let sql="insert into users (username,address,email,age) values ?";
db.query(sql,[value],(err,result)=>{
    if(err) throw err
    else{
        res.redirect('/printData')
    }
})



})


app.get('/printData', (req, res) => {
    let sql = 'select * from users'
    db.query(sql, (err, result)=>{
        if (err) throw err
        else{``
            res.render('print', {data: result})
        }
    })
})




app.listen(3000,()=>{
    console.log("this app is listening on port 3000");
})