import { BookMarked, CalendarSync, Home } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className='dark:bg-card container mx-auto flex items-center justify-between space-x-2 rounded-b-xl border-r border-b border-l px-3 py-2 shadow-sm'>
      <div className='flex w-full items-center justify-between'>
        <nav className='flex flex-wrap items-center gap-3'>
          <h1 className='sr-only'>Atra-Hasis Vault - {pathname.slice(1)}</h1>
          <Button
            variant={'ba-ghost'}
            className={'bg-input/60 dark:bg-input/30'}
            aria-current={pathname.match('/resources') ? 'page' : false}
            asChild
          >
            <Link to={'/'}>
              <Home />
              <span className='hidden md:inline'>Home</span>
            </Link>
          </Button>
          <Button
            variant={pathname.match('/resources') ? 'ba-main' : 'ba-ghost'}
            aria-current={pathname.match('/resources') ? 'page' : false}
            asChild
          >
            <Link to={'/resources'}>
              <BookMarked />
              <span className='hidden md:inline'>Resources</span>
            </Link>
          </Button>
          <Button
            variant={pathname.match('/banner') ? 'ba-main' : 'ba-ghost'}
            aria-current={pathname.match('/banner') ? 'page' : false}
            asChild
          >
            <Link to={'/banner'}>
              <CalendarSync />
              <span className='hidden md:inline'>Banner</span>
            </Link>
          </Button>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
