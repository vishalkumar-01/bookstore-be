import express from "express";

import { Book } from "../models/bookModel.js";

const router=express.Router();

//For creating a new book

router.post('/',async(req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishedYear){
            res.status(444).send({message:"Send all fields:title,author,publishedyear"});
        }

        const newBook = {
            title : req.body.title,
            author: req.body.author,
            publishedYear: req.body.publishedYear
        }

        const book= await Book.create(newBook);

        return res.status(201).send(book);
    }

    catch(err){
        console.log(err.message);
        res.status(500).send({
            message:err.message,
        });
    }
})

//For getting all books
router.get('/',async(req,res)=>{
    try{
        const books=await Book.find({});

        return res.status(200).json({
            "length" : books.length,
            books
        });
    }
    catch(err){
        console.error(err);
        return res.status(500).send({message:err.message});
    }
})

//For getting a single book by id
router.get('/:id',async(req,res)=>{
    try{
        const { id }=req.params;
        const book=await Book.findById(id);

        return res.status(200).json(book);
    }
    catch(err){
        console.error(err);
        res.status(500).send({message:err.message});
    }
})

//Route for updating a book by id
router.put('/:id',async(req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishedYear){
            return res.status(400).send({message:"Please fill all the fields to update "});
        }
        const {id}=req.params;
        const result= await Book.findByIdAndUpdate(id,req.body);
        if(!result){
            return res.status(404).json({message:"Book not found"});
        }
        return res.status(201).send({message:"Book updatedx successfully"});
    }
    catch(err){
        console.error(err);
        return res.status(500).send({message:err.message});
    }
})

//Route for deleting a book by id
router.delete('/:id',async(req,res)=>{
    try{
        const { id }=req.params;

        const result=await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).send({message:"Book not found"});
        }

        return res.status(201).send({message:"Book deleted successfully"});
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message:err.message});
    }
})

export default router;