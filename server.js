const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'))
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/thanks', (req, res) => {
    const msg = {
        to: 'tiana.hayden@me.com',
        from: req.body.email,
        subject: 'New email from portfolio',
        text: req.body.message,
        html: '<p>first name: ' + req.body.firstName + '</p><p>last name: ' + req.body.lastName + '</p><p> email: ' + req.body.email + '</p><p>message: ' + req.body.message + '</p>',
    };
    sgMail.send(msg);
    res.render('thanks', { contact: req.body })
});

app.get('/projects', (req, res) => {
    res.render('projects');
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));

