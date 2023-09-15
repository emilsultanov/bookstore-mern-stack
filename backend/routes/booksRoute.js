import express from "express";

import {BookModel} from "../models/bookModel.js";

export const bookRouter = express.Router();

bookRouter.get('/', async (request, response) => {
    try {
        const books = await BookModel.find({});
        return response.status(200).json({
            count: books.length, data: books
        });
    } catch (error) {
        console.log('/books get error: ', error);
        response.status(500).send({
            message: error.message
        })
    }
});


bookRouter.get('/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const bookById = await BookModel.findById(id);
        return response.status(200).json(bookById);
    } catch (error) {
        console.log('/books/:id get error: ', error);
        response.status(500).send({
            message: error.message
        });
    }
});


bookRouter.put('/:id', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: 'Send all required fields'
            })
        }

        const {id} = request.params;
        const result = await BookModel.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({
                message: 'Book not found'
            })
        }

        return response.status(200).send({
            message: 'Book updated successfully'
        })

    } catch (error) {
        console.log('/books/:id put error: ', error);
        response.status(500).send({
            message: error.message
        });
    }
});


bookRouter.delete('/:id', async (request, response) => {
    try {
        const {id} = request.body;
        const result = await BookModel.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({
                message: 'Book not found'
            })
        }

        return response.status(200).send({
            message: 'Book deleted successfully'
        })

    } catch (error) {
        console.log('/books/:id delete error: ', error);
        response.status(500).send({
            message: error.message
        });
    }
})

bookRouter.post('/', async (request, response) => {
    console.log('request body', request.body)
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: 'Send all required fields'
            })
        }
        const newBook = {
            title: request.body.title, author: request.body.author, publishYear: request.body.publishYear
        };

        const book = await BookModel.create(newBook);

        return response.status(201).send(book);

    } catch (error) {
        console.log('/books post error: ', error);
        response.status(500).send({
            message: error.message
        })
    }
})