import { TMDB_API_PREFIX } from '@/utils/settings'
import { useEffect, useState } from 'react'

const timeout = (time: number, promise: Promise<{}>) => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject(new Error('Request timed out.'))
    }, time)
    promise.then(resolve, reject)
  })
}

const checkOnlineStatus = async () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal
  const controller = new AbortController()
  const { signal } = controller

  // If the browser has no network connection return offline
  if (!navigator.onLine) return navigator.onLine

  try {
    await timeout(
      3000,
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

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true)

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
    }, 1000)

    return () => {
      window.removeEventListener('offline', () => {
        setOnlineStatus(false)
      })

      clearInterval(id)
    }
  }, [])

  return onlineStatus
}

export default useOnlineStatus
