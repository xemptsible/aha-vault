import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  layout('routes/navigation/layout.tsx', [
    route('banner', 'routes/banner.tsx'),
    route('resources', 'routes/resources.tsx'),
    route('raid-score-calc', 'routes/raid-score-calc.tsx'),
  ]),

  // https://github.com/abereghici/remix-themes/tree/main#add-the-action-route
  route('action/set-theme', 'routes/action/set-theme.tsx'),
] satisfies RouteConfig
