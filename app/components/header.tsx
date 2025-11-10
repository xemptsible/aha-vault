import { BookMarked, Calculator, CalendarSync, Home } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className='dark:bg-card container mx-auto flex items-center justify-between space-x-2 rounded-b-xl border-r border-b border-l px-3 py-2 shadow-sm'>
      <div className='flex w-full items-center justify-end md:justify-between'>
        <nav className='hidden items-center gap-3 md:flex'>
          <Button
            variant={pathname.endsWith('/') ? 'ba-main' : 'ba-ghost'}
            asChild
            className={!pathname.endsWith('/') ? 'bg-input/30' : ''}
          >
            <Link to={'/'}>
              <Home />
              <span>Home</span>
            </Link>
          </Button>
          <Button
            variant={pathname.match('/resources') ? 'ba-main' : 'ba-ghost'}
            asChild
          >
            <Link to={'/resources'}>
              <BookMarked />
              <span>Resources</span>
            </Link>
          </Button>
          <Button
            variant={pathname.match('/banner') ? 'ba-main' : 'ba-ghost'}
            asChild
          >
            <Link to={'/banner'}>
              <CalendarSync />
              <span>Banner</span>
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
              <span>Raid Score Calculator</span>
            </Link>
          </Button>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
