import express from 'express';
const app = express()
const port = 3000

interface Note {
    id: string;
    tilt?: string;
    hue?: string;
    title: string;
    text: string;
}

app.get('/', (_req, res) => {

    const externalNotes: Note[] = [{
        id: '0',
        text: 'This is a task that needs done',
        title: 'External Task #1'
    },{
        id: '1',
        text: 'This is a task that needs done',
        title: 'External Task #2'
    },{
        id: '2',
        text: 'This is a task that needs done',
        title: 'External Task #3'
    },{
        id: '3',
        text: 'This is a task that needs done',
        title: 'External Task #4'
    }]

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.json({
        notes: externalNotes
    })
})

app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})