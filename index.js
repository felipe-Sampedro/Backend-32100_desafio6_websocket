const express = require('express')
const path = require('path')
const {engine:handlebars}=require('express-handlebars')
const Products = require('./model/products')

const productsRoutes = require('./routes')

const PORT = process.env.PORT || 8080

const app = express()
const products = new Products()

app.engine('hbs',handlebars({
    extname:'hbs',
    defaultLayout:'index.hbs',
    layoutsDir: path.resolve(__dirname,'./views/layouts'),
    partialsDir:path.resolve(__dirname,'./views/partials')
}))

app.set('views','./views/layouts');
app.set('view engine','hbs')

// app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.render('main',{showp:true,products:products.getAll()})
})

app.use('/productos',productsRoutes)

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({ err, message: 'Something went wrong, sorry' });
});

app.listen(PORT, ()=>console.log("Ready an running on port", PORT))

// connectedSever.on("error", (error)=> {
//     console.log(`Something Went Wrong -> ERROR: `, error.message);
// });