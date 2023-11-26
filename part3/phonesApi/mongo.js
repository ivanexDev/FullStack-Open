const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber =  process.argv[4]

const url =
  `mongodb+srv://admin_ivan:${password}@cluster0.gps2jrg.mongodb.net/phone-app`

mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
    name: String,
    number: Number
})

const Phone = mongoose.model('Phone', phoneSchema)

const phone = new Phone({
    name: newName,
    number: newNumber
})

if(process.argv.length === 3){
   return  Phone.find({}).then(persons=>{
           console.log(persons)
           mongoose.connection.close()
})
}

phone.save().then(result => {
  console.log(`added ${newName} number ${newNumber} to phonebook`)
  mongoose.connection.close()
})