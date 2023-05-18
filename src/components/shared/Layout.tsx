type Props = {
  children: string | React.JSX.Element | React.JSX.Element[]
}
export const Layout = ({children}: Props ) => {
  return (
    // <Navbar />
    <div className="layout">
      {children}
    </div>
    // <Footer />
  )
}