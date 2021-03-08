const express = require('express')
let bodyParser = require('body-parser');
const app = express()
const router = express.Router()
const PORT = 80

let bears = {
    list: [
        { "id": 1, "name": "Winnie", "weight": 50 },
        { "id": 2, "name": "Pooh", "weight": 66 }]
 }

let students = {
    list: [
        { "Id": 1, "Name": "Sirinyapat" , "Surname": "Boonwong" , "Major": "CoE" , "GPA": 3.02},
        { "Id": 2, "Name": "Jaturon" , "Surname": "Moonjan" , "Major": "CoE" , "GPA": 3.52}
    ]
}
  
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);
 

router.route('/bears')
   .get((req, res) => res.json(bears))
   .post((req,res) => {
       let id = (bears.list.length) ? bears.list[bears.list.length-1].id + 1 : 1
       let name = req.body.name
       let weight = req.body.weight
       bears = {list: [ ...bears.list, {id , name , weight}]}
       res.json(bears.list)
   })

router.route('/students')
    .get((req,res) => res.json(students))
    .post((req,res) => {
       let Id = (students.list.length) ? students.list[students.list.length-1].Id + 1 : 1
       let Name = req.body.Name
       let Surname = req.body.Surname
       let Major = req.body.Major
       let GPA = req.body.GPA
       students = {list: [ ...students.list, {Id , Name , Surname , Major , GPA}]}
       res.json(students.list)
    })

router.route('/bears/:bear_id')
   .get( (req,res) => {
       let id = bears.list.findIndex( (item) => (item.id === +req.params.bear_id))
       res.json(bears.list[id])
   })
   .put( (req,res) => {
        let id = bears.list.findIndex( (item) => (item.id === +req.params.bear_id))
        bears.list[id].name =  req.body.name
        bears.list[id].weight =  req.body.weight
        res.json(bears.list)
   })
   .delete( (req, res) => {
        bears.list = bears.list.filter( item => item.id !== +req.params.bear_id )
        res.json(bears.list)
})

router.route('/students/:student_Id')
    .get( (req,res) => {
        let Id = students.list.findIndex( (item) => (item.Id === +req.params.student_Id))
        if(+students.list[Id] !== +req.params.student_Id) {
            res.json('Student Not Found')
        }
        else {   
           res.json(students.list[Id])
        }
    })
    .put( (req,res) => {
        let Id = students.list.findIndex( (item) => (item.Id === +req.params.student_Id))
        if(+students.list[Id] !== +req.params.student_Id) {
            res.json('Student Not Found')
        }
        else { 
            students.list[Id].Name = req.body.Name
            students.list[Id].Surname = req.body.Surname
            students.list[Id].Major = req.body.Major
            students.list[Id].GPA = req.body.GPA
            res.json(students.list)  
        }
    })
    .delete( (req,res) => {
        students.list = students.list.filter( item => item.Id !== +req.params.student_Id )
        if(+students.list[Id] !== +req.params.student_Id) {
            res.json('Student Not Found')
        }
        else {   
           res.json(students.list[Id])
        }
    })


app.use("*", (req, res) => res.status(404).send('404 Not found'))
app.listen(PORT,() => console.log('Service is running at',PORT))

