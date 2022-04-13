const express = require('express')
const app = express()
const cors = require('cors')

const port = 3000
const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.get('/produtos', validateToken, (req, res) => {
    let produtos = [
        { id: 1, disponivel: 2, descricao: "Camiseta Masculina 2", preco: 54.32 },
        { id: 2, disponivel: 7, descricao: "Tenis Corrida", preco: 214.24 },
        { id: 3, disponivel: 50, descricao: "Regata Nike", preco: 109.99 },
        { id: 4, disponivel: 23, descricao: "Camiseta Nike Vermelha", preco: 129.99 }
    ];

    res.send(produtos);
});

app.post('/login', (req, res) => {
    let email = req.body.email;
    let senha = req.body.senha;

    if (email === "teste@gmail.com") {
        let sucesso = {
            token: jwt,
            email: "teste@gmail.com",
            nome: "Alfredo Carvalho",
            permissao: "ADMIN"
        };
        res.send(sucesso);
        return;
    }


    let erro = {
        mensagem: "Não foi possível fazer o login"
    }
    res.status(403);
    res.send(erro);
})

function validateToken(req, res, next) {
    //get token from request header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        res.status(400).send("Authorization header not present");
        return;
    }
    
    const token = authHeader.split(" ")[1];
    //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
    if (token == null) { 
        res.status(400).send("Token not present"); 
        return;
    }

    if ( token === jwt) {
        // req.user = user -- add user to request
        next(); //proceed to the next action in the calling function
    } else {
        res.status(403).send("Token invalid");
    }
}
