var express = require('express');
var router = express.Router();
const { Pool } = require('pg');



const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'Students',
  user: 'postgres',
  password: '889900',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getstlist', function(req, res, next) {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query(`SELECT * FROM stud `,
      (err, result) => {
        release()
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        console.log(result.rows)
        res.send(result.rows)
      })
  })

 
});


router.get('/getmessage', function(req, res, next) {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query(`SELECT * FROM message WHERE id_student = ${req.query.id_st}`,
      (err, result) => {
        release()
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        console.log(result.rows)
        res.send(result.rows)
      })
  })

 
});


router.get('/getstinfo', function(req, res, next) {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query(`select CONCAT (fam,  '' , name) AS fio from stud WHERE id_stud = ${req.query.id_st}`,
      (err, result) => {
        release()
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        console.log(result.rows);
        res.send(result.rows)
      })
  })

 
});

router.get('/sendmessage', function(req, res, next) {
 console.log (req.query.mess);
 console.log (req.query.st_id);

  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query(`INSERT INTO public.message
    (id_student,  message_text)   
     VALUES (${req.query.st_id}, '${req.query.mess}');`,
      (err, result) => {
        release()
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        console.log(result.rows);
        res.send('message inserted')
      })
  })

 
});

module.exports = router;
