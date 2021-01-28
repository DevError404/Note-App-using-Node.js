const chalk = require('chalk')
const yargs = require('yargs')
const { listNotes } = require('./notes.js')
const notes = require('./notes.js')

//customise yargs version
yargs.version('1.1.0')


//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note.',
    builder :{
        title:{
            describe:'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe:'Note body',
            demandOptions: true,
            type:'string'
        }
    },
    handler(argv) {
       notes.addNote(argv.title, argv.body)
    }
})

//create a remove command
yargs.command({
    command: 'remove',
    description: 'Remove a note',
    builder: {
        title: {
            describe:'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log('Removing a node')
        notes.removeNote(argv.title)
    }
})

//create a list command
yargs.command({
    command: 'list',
    description: 'Listing notes',
    handler() {
        console.log('listing notes')
        notes.listNotes()
       
    }
})

//create read command
yargs.command({
    command: 'read',
    description: 'Reading a note',
    builder: {
        title: {
            describe:'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log('Reading a note')
        notes.readNote(argv.title)
    }
})

yargs.parse()
//console.log(yargs.argv)

