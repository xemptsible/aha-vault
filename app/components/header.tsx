import { BookMarked, Calculator, CalendarSync, Home } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className='dark:bg-card container mx-auto flex items-center justify-between space-x-2 rounded-b-xl border-r border-b border-l px-3 py-2 shadow-sm'>
      <div className='flex w-full items-center justify-between'>
        <nav className='flex flex-wrap items-center gap-3'>
          <Button
            variant={'ba-ghost'}
            className={'bg-input/60 dark:bg-input/30'}
            asChild
          >
            <Link to={'/'}>
              <Home />
              <span className='hidden md:inline'>Home</span>
            </Link>
          </Button>
          <Button
            variant={pathname.match('/resources') ? 'ba-main' : 'ba-ghost'}
            asChild
          >
            <Link to={'/resources'}>
              <BookMarked />
              <span className='hidden md:inline'>Resources</span>
            </Link>
          </Button>
          <Button
            variant={pathname.match('/banner') ? 'ba-main' : 'ba-ghost'}
            asChild
          >
            <Link to={'/banner'}>
              <CalendarSync />
              <span className='hidden md:inline'>Banner</span>
            </Link>
          </Button>
          <Button
            variant={
              pathname.match('/raid-score-calc') ? 'ba-main' : 'ba-ghost'
            }
            asChild
          >
            <Link to={'/raid-score-calc'}>
              <Calculator />
              <span className='hidden md:inline'>Raid Score Calculator</span>
            </Link>
          </Button>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
