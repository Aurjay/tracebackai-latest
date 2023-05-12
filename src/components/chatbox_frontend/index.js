import { Container, TextareaAutosize, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import EmptyTextarea from './text_box'
import { Scrollbar } from 'react-scrollbars-custom';
import { Card } from '@mui/material';

const ChatboxFrontend = () => {
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState([])
  
  const handleSubmit = async () => {
    console.log("donnee")
    alert(prompt)
    if (prompt.trim().length === 0) {
      return
    }

    setMessages(messages => [
      ...messages,
      {
        text: prompt.trim(),
        id: new Date().toISOString(),
        author: 'human'
      }
    ])

    setPrompt('')

    // await new Promise(res => setTimeout(res, 1000))

    setMessages(messages => [
      ...messages,
      {
        text: 'Just some hardcoded response bla bla sdfaasfafd...',
        id: new Date().toISOString(),
        author: 'ai'
      }
    ])
    const response = await fetch('../../pages/api/users', {
      method: 'GET',

    })

    const json = await response.json()

    if (response.ok) {
      console.log(json.result)

      setMessages(messages => [
        ...messages,
        {
          text: json.result,
          id: new Date().toISOString(),
          author: 'ai'
        }
      ])
    } else {
      console.warn(json?.error?.message)
    }
  }
  function MessageItem({ message }) {
    const [text, setText] = useState(message.author === 'human' ? message.text : '')

    useEffect(() => {
      setTimeout(() => {
        setText(message.text.slice(0, text.length + 1))
      }, 10)
    }, [text, message.text])

    return (
      <div className='answer'>
        <div className={`author author-${message.author}`}>{message.author}:</div>
        <div className='message'>{text}</div>
      </div>
    )
  }

  return (
    <Container>
      <div className='inputContainer'>
        <TextareaAutosize
          onChange={(e) => {
            setPrompt(e.target.value)
          }}
          placeholder='Ask a question related to EU-AI-ACT'
          rowsMax={3}
        />
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          Submit
        </Button>
      </div>

      <Card sx={{ height: 500, overflowY: "scroll" ,maxHeight:1500 }} variant="outlined">      
      <div className='answers'>
        {messages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div></Card>

      

    </Container>
  )
}

export default ChatboxFrontend
