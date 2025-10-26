import { Outlet } from 'react-router'
import Header from '~/components/header'

export default function HeaderLayout() {
  return (
    <>
      <Header />
      <main className='container mx-auto flex-1'>
        <Outlet />
      </main>
    </>
  )
}
