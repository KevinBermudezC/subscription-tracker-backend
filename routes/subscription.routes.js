import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req,res) => {
    res.send({title: 'GET all subscriptions'});
})

subscriptionRouter.get('/:id', (req,res) => {
    res.send({title: 'GET  subscriptions details'});
})

subscriptionRouter.post('/', (req,res) => {
    res.send({title: 'CREATE new subscriptions'});
})

subscriptionRouter.put('/:id', (req,res) => {
    res.send({title: 'UPDATE subscriptions'});
})

subscriptionRouter.delete('/:id', (req,res) => {
    res.send({title: 'DELETE all subscription'});
})

subscriptionRouter.get('/user/:id', (req,res) => {
    res.send({title: 'GET all users subscriptions'});
})

subscriptionRouter.get('/:id/cancel', (req,res) => {
    res.send({title: 'CANCEL subscriptions'});
})

subscriptionRouter.get('/upcoming-revewals', (req,res) => {
    res.send({title: 'GET upcoming renewals'});
})

export default subscriptionRouter;