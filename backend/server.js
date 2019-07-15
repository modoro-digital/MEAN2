const express = require('express'); 
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Issue = require('./models/Issue');
const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/issues');

const connection = mongoose.connection;


connection.on('connected', () => {
    console.log('MongoDB database connection established successfully!');
});

connection.on('error',(err) => {
    if(err) {
        console.log("Database mongodb connected : "+err);
    }   
})

// add issue

router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save().then(issue => {
        res.status(200).json({"add" : "success"});
    })
    .catch(err => {
        res.status(400).send("Fail");
    })
});

// retrieving issue
router.get('/issues',(req, res,next) => {
    Issue.find((err, issues) => {
        res.json(issues);
    });
    
});

// find issue by id
router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err)
            console.log(err);
        else
            res.json(issue);
    })
});


// update issue by id
router.route('/issues/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue)
            return next(new Error('Could not load Document'));
        else {
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;
            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});


// delete issue by id
router.route('/issues/delete/:id').get((req, res) => {
    Issue.remove({_id: req.params.id}, (err, issue) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));



router.route('/abc',(req,res)=> {
    res.send("Hello world");
})