const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req,res)=>{
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/posts', verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey',(err, authData) =>{
        if(err)
        {
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
});


app.post('/api/login', (req,res)=>{
    // Mock user
    const user ={
        id: 1,
        username: 'lima',
        email: 'lima@fatecsp.br'
    }

    jwt.sign({user}, 'secretkey', { expiresIn: '30s'}, (err, token)=>
    {
        res.json({
            token
        })
    });
});

//Formata o Token
//Authorization: Bearer <access_token>

//Verifica Token
function verifyToken(req,res, next)
{
    //Get auth hearder value
    const bearerHeader = req.headers['authorization'];
    //Verifica se o bearer está definido
    if(typeof bearerHeader !== 'undefined') {
        //Formatando o token
        const bearer = bearerHeader.split(' ');
        //Get token no array
        const bearerToken = bearer[1];
        //Set token
        req.token = bearerToken;
        //Next middleware
        next();
    }else
    {
        //Perdido
        res.sendStatus(403);
    }
}
app.listen(5000, ()=> console.log('Server started on port 5000'));
