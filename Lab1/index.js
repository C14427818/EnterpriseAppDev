/**
 * Created by ORuairc on 29/01/2018.
 */

const express = require('express');
const massive = require('massive');
const http = require('http');
const app = express();
const models = require('../models/index');
//const db = massive.connectSync({ db: 'pgguide' });
//const connectionString = "postgres://localhost/pgguide";
//const massiveInstance = massive.connectSync({connectionString : connectionString})
//const pgp = require('pg-promise')
//const db = pgp('postgres://ORuairc:password@localhost/pgguide')

massive({
    host: '127.0.0.1',
    port: 5432,
    database: 'pgguide',
    user: 'ORuairc',
    password: 'mdcs8397'
}).then(instance => {

    app.set('db', instance);

    app.get("/users", (req, res) => {
        req.app
            .get("db")
            .query("select email,details->'sex' AS sex,created_at from users order by created_at desc")
            .then(items => {
                res.status(200).json(items);
            })
    });

        app.get("/products", (req, res) => {
            req.app
                .get("db")
                .query("select * from products order by price asc")
                .then(items => {
                    res.status(200).json(items);
                })

             });

    app.get("/products/:id", (req, res) => {
        req.app
            .get("db")
            .query("select * from products order by id asc \n")
            .then(items => {
                res.status(200).json(items);
            })

    });

    app.get("/purchases", (req, res) => {
        req.app
            .get("db")
            .query("select purchases.name, purchases.address, users.email, purchase_items.price, purchase_items.quantity, purchase_items.state from purchases, users, purchase_items where purchases.user_id = users.id and purchases.id = purchase_items.purchase_id order by price desc")
            .then(items => {
                res.status(200).json(items);
            })

    });

    //Vulnerability: Should delete all content in products table and therefor drop the table entirely.
    app.get("/hack", (req, res) => {
        const title = req.query.title;
        req.app
            .get("db")
            .query("select * from products where title = title")
            .then(items => {
                res.status(200).json(items);
            })

    });

    //Parametrised Fix
    app.get("/products/safe", (req, res) => {
        const title = req.params.title;
        req.app
            .get("db")
            .query("select * from products where title = $1",[title])
            .then(items => {
                res.status(200).json(items);
            })

    });

    //Stored Fix
    app.get("/products/safe1", (req, res) => {
        const title = req.params.title;
        req.app
            .get("db")
            //or .get_products
            .find_products([title])
            .then(items => {
                res.status(200).json(items);
            })

    });

    //Delete for CRUD
    app.delete('/products/:id', (req, res) => {
        const id = req.params.id;

        models.Case.destroy({ where : id })
            .then(() => {
                models.Products.destroy({ where: { id } });
            })
            .then(() => res.send(response('success', 'deleted')))
            .catch(() => res.send(response('failed', 'error')));
    });





        app.listen(3000, () => console.log('Listening on port 3000!'));

    });


/*app.get('/', (req, res) => {

        res.send('Whats Happening');
});*/

