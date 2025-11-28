import { Link } from 'react-router'
import { ThemeToggle } from '~/components/theme-toggle'
import { Button } from '~/components/ui/button'

export default function Home() {
  return (
    <>
      <title>Atra-Hasis Vault</title>
      <meta
        name='description'
        content='The Ark that will archive all mysteries'
      />
      <header className='container mx-auto flex items-center justify-between p-4'>
        <div className='invisible'></div>
        <h1 className='text-4xl font-semibold'>
          Atra-Hasis <span className='text-[#178cf9]'>Vault</span>
        </h1>
        <ThemeToggle />
      </header>
      <main className='container mx-auto flex flex-1 flex-wrap items-center justify-center gap-4'>
        <Button
          variant={'ghost'}
          className={`h-fit flex-col`}
          asChild
        >
          <Link to={'/resources'}>
            <img
              src='/resources.webp'
              height={125}
              width={125}
              aria-hidden
            />
            <span className='text-lg font-semibold'>Resources</span>
          </Link>
        </Button>
        <Button
          variant={'ghost'}
          className={`h-fit flex-col`}
          asChild
        >
          <Link to={'/banner'}>
            <img
              src='/banner.webp'
              height={125}
              width={125}
              aria-hidden
            />
            <span className='text-lg font-semibold'>Banner</span>
          </Link>
        </Button>
        <Button
          variant={'ghost'}
          className={`h-fit flex-col`}
          asChild
        >
          <Link to={'/raid-score-calc'}>
            <img
              src='/calc.webp'
              height={125}
              width={125}
              aria-hidden
            />
            <span className='text-lg font-semibold'>Raid Score Calculator</span>
          </Link>
        </Button>
      </main>
    </>
  )
}
