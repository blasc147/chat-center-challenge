import { renderHook, act } from '@testing-library/react-hooks'
import useChat from '../hooks/useChat'
import LatestMessagesContext, {
  LatestMessagesProvider
} from '../contexts/LatestMessages/LatestMessages'
import axios from 'axios'
import { io } from 'socket.io-client'

jest.mock('socket.io-client')
const mockSocket = {
  on: jest.fn(),
  emit: jest.fn(),
  off: jest.fn()
}

io.mockReturnValue(mockSocket)

jest.mock('axios')

describe('useChat hook', () => {
  const initialMessages = { bot: 'Hello, I am a bot!' }

  const wrapper = ({ children }) => (
    <LatestMessagesProvider initialMessages={initialMessages}>
      {children}
    </LatestMessagesProvider>
  )

  it('should initialize with no messages for a new user', () => {
    const { result } = renderHook(() => useChat('newUser'), { wrapper })
    expect(result.current.messages).toEqual([])
  })

  it('should fetch and set messages for an existing user', async () => {
    const mockResponse = {
      data: { messages: [{ user: 'bot', message: 'Welcome back!', id: 1 }] }
    }
    axios.get.mockResolvedValueOnce(mockResponse)

    const { result, waitForNextUpdate } = renderHook(() => useChat('bot'), {
      wrapper
    })

    await waitForNextUpdate()
    expect(result.current.messages).toEqual(mockResponse.data.messages)
  })

  it('should add a message when sendMessage is called', () => {
    const { result } = renderHook(() => useChat('bot'), { wrapper })

    act(() => {
      result.current.onChangeMessage({ target: { value: 'Hi!' } })
      result.current.sendMessage()
    })

    expect(result.current.messages.length).toBe(1)
    expect(result.current.messages[0].message).toBe('Hi!')
  })

  it('should receive and add a bot message', () => {
    const { result } = renderHook(() => useChat('bot'), { wrapper })

    act(() => {
      mockSocket.on.mock.calls.find(([event]) => event === 'bot-message')[1](
        'Hello, human!'
      )
    })

    expect(result.current.messages.length).toBe(1)
    expect(result.current.messages[0].message).toBe('Hello, human!')
  })
})
