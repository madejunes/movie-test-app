import React, { useState, useEffect, useContext } from 'react'
import { TMDB_API_PREFIX } from '@/utils/settings'

const TIMEOUT_TIME_MS = 3000
const onlinePollingInterval = 10000

const timeout = (time: number, promise: Promise<{}>) => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject(new Error('Request timed out.'))
    }, time)
    promise.then(resolve, reject)
  })
}

const checkOnlineStatus = async () => {
  const controller = new AbortController()
  const { signal } = controller

  // If the browser has no network connection return offline
  if (!navigator.onLine) return navigator.onLine

  //
  try {
    await timeout(
      TIMEOUT_TIME_MS,
      fetch(
        `${TMDB_API_PREFIX}movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        {
          method: 'GET',
          signal,
        }
      )
    )
    return true
  } catch (error) {
    // Error Log
    console.error(error)

    // This can be because of request timed out
    // so we abort the request for any case
    controller.abort()
  }
  return false
}

const OnlineStatusContext = React.createContext(true)

type Props = {
  children: React.ReactNode
}

export const OnlineStatusProvider: React.FC<Props> = ({ children }) => {
  const [onlineStatus, setOnlineStatus] = useState<boolean>(true)

  const checkStatus = async () => {
    const online = await checkOnlineStatus()
    setOnlineStatus(online)
  }

  useEffect(() => {
    window.addEventListener('offline', () => {
      setOnlineStatus(false)
    })

    // Add polling incase of slow connection
    const id = setInterval(() => {
      checkStatus()
    }, onlinePollingInterval)

    return () => {
      window.removeEventListener('offline', () => {
        setOnlineStatus(false)
      })

      clearInterval(id)
    }
  }, [])

  return (
    <OnlineStatusContext.Provider value={onlineStatus}>
      {children}
    </OnlineStatusContext.Provider>
  )
}

export const useOnlineStatus = () => {
  const store = useContext(OnlineStatusContext)
  return store
}
