import { Outlet } from 'react-router'
import Header from '~/components/header'

export default function HeaderLayout() {
  return (
    <>
      <Header />
      <main className='container mx-auto flex flex-1 flex-col p-4 lg:px-2 lg:py-4'>
        <Outlet />
      </main>
    </>
  )
}
