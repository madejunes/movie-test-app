import Navbar from './Navbar'

type LayoutProps = {
  children: string | React.JSX.Element | React.JSX.Element[]
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout container mx-auto">
      <h1 className="sr-only">Movie Test App</h1>
      <Navbar />
      <div className="content">{children}</div>
    </div>
  )
}
