import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  type LoaderFunctionArgs,
} from 'react-router'
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from 'remix-themes'
import type { Route } from './+types/root'
import './app.css'
import { cn } from './lib/utils'
import { themeSessionResolver } from './sessions.server'
import { preconnect } from 'react-dom'

export const links: Route.LinksFunction = () => []

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request)

  return {
    theme: getTheme(),
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>()

  return (
    <ThemeProvider
      specifiedTheme={data?.theme ?? null}
      themeAction='/action/set-theme'
    >
      <ProviderLayout>{children}</ProviderLayout>
    </ThemeProvider>
  )
}

function ProviderLayout({ children }: { children: React.ReactNode }) {
  preconnect('/aha-root.css')
  const data = useLoaderData<typeof loader>()
  const [theme] = useTheme()

  return (
    <html
      lang='en'
      className={cn(theme ?? '')}
    >
      <head>
        {/* <script src='https://unpkg.com/react-scan/dist/auto.global.js' /> */}
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <Meta />
        <Links />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data?.theme)} />
      </head>
      <body className='flex flex-col'>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <>
      <Outlet />
      <footer className='bg-card flex flex-col justify-between gap-1 border-t px-3 py-1 lg:flex-row'>
        <span className='text-center text-sm'>{'AYWKRCVB - NA'}</span>
        <p className='text-center text-xs'>
          No affiliation nor endorsement from NEXON Games Co., Ltd. or Yostar,
          Inc.
        </p>
      </footer>
    </>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <>
      <title>404 Not Found</title>
      <main className='container mx-auto p-4 pt-16'>
        <h1 className='text-3xl'>{message}</h1>
        <p>{details}</p>
        {stack && (
          <pre className='w-full overflow-x-auto p-4'>
            <code>{stack}</code>
          </pre>
        )}
        <a
          href='/'
          className='hover:text-secondary underline underline-offset-2'
        >
          Go home
        </a>
      </main>
    </>
  )
}
