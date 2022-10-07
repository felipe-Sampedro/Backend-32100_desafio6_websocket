const express = require('express')
const router = express.Router()
const Products = require('./model/products')

const products = new Products()

router.get('/',(req,res)=>{
    const productos = products.getAll()
    res.render('list',{title:'productos',productos})
})

router.get('/:id',(req,res)=>{
    const {id} = req.params
    console.log(id);
    const product = products.getById(id)
    if (!product){
        return res.status(404).json({message:"Producto no Encontrado",error:"NOT_FOUND"})
    }
    console.log(req.params);
    res.json(product)
})



router.post('/',(req,res)=>{
    const {nombre,precio,imagen} = req.body;
    products.save({
        nombre,
        precio,
        imagen
    })
    res.redirect('/');
})



router.put('/:id',(req,res)=>{
    const {id} = req.params;
    const {title, price, thumbnail} = req.body;
    const product = products.updateById(id,{
        title,
        price,
        thumbnail,
    })
    if (indProduct<0){
        return res.status(404).send(`Producto con id ${id} no existe`)
    }
    res.json(product)
})


router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    const product = products.deleteById(id)
    if (indProduct<0){
        return res.status(400).send(`Producto con id ${id} no existe`)
    }
    res.json(product)
})





module.exports = router