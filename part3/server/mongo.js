// const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }

// const password = process.argv[2]

// const url =
//   `mongodb+srv://admin_ivan:${password}@cluster0.gps2jrg.mongodb.net/note-app`

// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'Callback-functions suck',
//   date: new Date(),
//   important: true,
// })

// // Note.find({}).then(result => {
// //   result.forEach(note => {
// //     console.log(note)
// //   })
// //   mongoose.connection.close()
// // })

// Note.find({important :true }).then(res=>{
//   console.log(res)
//   mongoose.connection.close()
// })



// // note.save().then(result => {
// //   console.log('note saved!')
// //   mongoose.connection.close()
// // })