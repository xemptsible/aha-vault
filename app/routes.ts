import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  layout('routes/_layout.tsx', [
    layout('routes/banner/_layout.tsx', { id: 'banner-loader' }, [
      route('banner', 'routes/banner/main.tsx'),
    ]),
    layout('routes/resource/_layout.tsx', { id: 'resource-loader' }, [
      route('resources', 'routes/resource/main.tsx'),
    ]),
  ]),

  // https://github.com/abereghici/remix-themes/tree/main#add-the-action-route
  route('action/set-theme', 'routes/action/set-theme.tsx'),
] satisfies RouteConfig
