import { useOnlineStatus } from '@/features/connectivity/components/OnlineStatusProvider'
import Navbar from './Navbar'

type LayoutProps = {
  children: string | React.JSX.Element | React.JSX.Element[]
}
export default function Layout({ children }: LayoutProps) {
  const isOnline = useOnlineStatus()
  return (
    <>
      <div className="text-white text-center bg-zinc-700">
        internet connection is {isOnline ? 'online' : 'offline'}!
      </div>
      <div className="layout container mx-auto px-4">
        <Navbar />
        <div className="content">{children}</div>
      </div>
    </>
  )
}
