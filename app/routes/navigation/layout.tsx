import { Outlet } from 'react-router'
import Header from '~/components/header'

export default function HeaderLayout() {
  return (
    <>
      <Header />
      <main className='container mx-auto flex flex-1 flex-col px-4 py-8 lg:px-0'>
        <Outlet />
      </main>
    </>
  )
}
