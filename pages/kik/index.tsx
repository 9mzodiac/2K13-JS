"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/react"

interface Message {
  id: string
  text: string
  isOwn: boolean
  timestamp: Date
}

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #f0f0f5;
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  min-height: 0; /* Important for flex children */
`

const StatusBar = styled.div`
  background: #000;
  color: white;
  padding: 4px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
`

const Header = styled.div`
  background: #4a4a4a;
  color: white;
  padding: 12px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
`

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`

const ActionButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
`

const ChatArea = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
  scroll-behavior: smooth;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.2);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0,0,0,0.3);
  }
`

const Timestamp = styled.div`
  text-align: center;
  color: #888;
  font-size: 14px;
  margin: 8px 0;
`

const MessageRow = styled.div<{ isOwn?: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.isOwn ? "flex-end" : "flex-start")};
  align-items: flex-end;
  gap: 8px;
`

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ddd;
  background-image: url('/images/holly.JPEG');
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`

const MessageBubble = styled.div<{ isOwn?: boolean }>`
  max-width: 250px;
  padding: 8px 12px;
  border-radius: 18px;
  font-size: 16px;
  line-height: 1.4;
  ${(props) =>
    props.isOwn
      ? css`
    background: #a4d65e;
    color: #333;
    border-bottom-right-radius: 4px;
  `
      : css`
    background: white;
    color: #333;
    border-bottom-left-radius: 4px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  `}
`

const SystemMessage = styled.div`
  background: rgba(255,255,255,0.8);
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 14px;
  color: #666;
  text-align: center;
  margin: 8px 32px;
`

const GalleryCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  max-width: 250px;
`

const GalleryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #666;
  font-size: 14px;
`

const GalleryImage = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 8px;
  background-image: url('/placeholder.svg?height=150&width=226');
  background-size: cover;
  background-position: center;
`

const InputArea = styled.div`
  background: white;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: 1px solid #e0e0e0;
  flex-shrink: 0; /* Prevent shrinking */
`

const AddButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ddd;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #666;
  cursor: pointer;
`

const MessageInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 20px;
  background: #f5f5f5;
  position: relative;
  z-index: 100;
  pointer-events: auto;
  
  &::placeholder {
    color: #999;
  }
`

const SendButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #4a90e2;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  font-size: 14px;
`

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: white;
  border-radius: 18px;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  max-width: 60px;
`

const TypingDot = styled.div<{ delay: number }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #999;
  animation: typing 1.4s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
  
  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
      opacity: 0.4;
    }
    30% {
      transform: translateY(-10px);
      opacity: 1;
    }
  }
`

const ChatPage: React.FC = () => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Heyyyyyy! I'm Holly!",
      isOwn: false,
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const chatAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatAreaRef.current?.scrollTo({ top: chatAreaRef.current.scrollHeight })
  }, [messages, isTyping])

  async function getHollyResponse(userMsg: string): Promise<string> {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      })

      if (!res.ok) {
        const t = await res.text()
        throw new Error(`API ${res.status}: ${t}`)
      }

      const { response } = (await res.json()) as { response: string }
      return response
    } catch (err) {
      console.error("Error getting Holly response:", err)
      return "Oops, couldn't reach Holly right now! 😢"
    }
  }

  async function handleSend() {
    if (!message.trim()) return
    const user = { id: Date.now().toString(), text: message.trim(), isOwn: true, timestamp: new Date() }
    setMessages((m) => [...m, user])
    setMessage("")
    setIsTyping(true)

    const hollyText = await getHollyResponse(user.text)
    setIsTyping(false)
    const hollyMsg = { id: `${Date.now()}h`, text: hollyText, isOwn: false, timestamp: new Date() }
    setMessages((m) => [...m, hollyMsg])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }


  return (
    <ChatContainer>

      <Header>
        <HeaderTitle>HOLLY</HeaderTitle>
      </Header>

      <ChatArea>
        <Timestamp>Today @ 2:42 PM</Timestamp>

        {messages.map((msg) => (
          <MessageRow key={msg.id} isOwn={msg.isOwn}>
            {!msg.isOwn && <Avatar />}
            <MessageBubble isOwn={msg.isOwn}>{msg.text}</MessageBubble>
          </MessageRow>
        ))}

        {isTyping && (
          <MessageRow isOwn={false}>
            <Avatar />
            <TypingIndicator>
              <TypingDot delay={0} />
              <TypingDot delay={0.2} />
              <TypingDot delay={0.4} />
            </TypingIndicator>
          </MessageRow>
        )}
      </ChatArea>

      <InputArea>
        <AddButton>+</AddButton>
        <MessageInput
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SendButton onClick={handleSend}>→</SendButton>
      </InputArea>
    </ChatContainer>
  )
}

export default ChatPage
