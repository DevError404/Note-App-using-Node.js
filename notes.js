const { default: chalk } = require('chalk')
const fs = require('fs')

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNodes = notes.filter((note) => note.title === title)

    if (duplicateNodes.length ===   0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('Note added!')
    }
    else {
        console.log('Note already taken.')
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJson)
}

const loadNotes = () => {
    try {
        const databuffer = fs.readFileSync('notes.json')
        const dataJson = databuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
    
}

const removeNote = (title) => {
    try {
        const notes = loadNotes()
        const notesToKeep = notes.filter((note) => note.title !== title)
        if(notes.length > notesToKeep.length) {
            console.log(chalk.green.inverse('Note Removed'))
            saveNotes(notesToKeep)
        } else {
            console.log(chalk.red.inverse('No Note Found'))
        }
        
    }
    catch (e) {
        return []
    }
}

const listNotes = () => {
    console.log(chalk.yellow('Your note'))
    const notes = loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
     const note = notes.find((note) => note.title === title)
     if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
     }else {
        console.log(chalk.red.inverse('Note not found!'))
     }
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}