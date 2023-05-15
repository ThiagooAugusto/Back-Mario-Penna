import store from '@state/store'

// auth related routes
const authRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => lazyLoadView(import('@views/pages/account/login')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'dashboard' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => lazyLoadView(import('@views/pages/account/register')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'dashboard' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/confirm-account',
    name: 'confirm-account',
    component: () => lazyLoadView(import('@views/pages/account/confirm')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'dashboard' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/forget-password',
    name: 'forget-password',
    component: () =>
      lazyLoadView(import('@views/pages/account/forgetPassword')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'dashboard' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        store.dispatch('auth/logOut')
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          (route) => route.meta.authRequired
        )
        // Navigate back to previous page, or home as a fallback
        next(
          authRequiredOnPreviousRoute ? { name: 'dashboard' } : { ...routeFrom }
        )
      },
    },
  },
]

// error pages
const errorPagesRoutes = [
  {
    path: '/404',
    name: '404',
    component: require('@views/pages/secondary/error-404').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  {
    path: '/500',
    name: '500',
    component: require('@views/pages/secondary/error-500').default,
    props: true,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '*',
    redirect: '404',
  },
]

// dashboard
const dashboardRoutes = [
  {
    path: '/',
    name: 'Dashboard',
    
    icon: 'home',
    badge: {
      text: '1',
      varient: 'success',
    },
    component: () => lazyLoadView(import('@views/pages/dashboard/dashboard')),
    meta: { authRequired: true },
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
  },
]

// apps
const calendarAppsRoutes = [
  {
    path: '/apps/calendar',
    name: 'Calendar',
    header: 'Apps',
    icon: 'calendar',
    component: () => lazyLoadView(import('@views/pages/apps/calendar')),
    meta: { authRequired: true },
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
  }
];

const emailAppsRoutes = [
  {
    path: '/apps/email',
    name: 'Email',
    icon: 'inbox',
    meta: { authRequired: true },
    // create a container component
    component: {
      render(c) {
        return c('router-view')
      },
    },
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
    children: [
      {
        name: 'Inbox',
        path: 'inbox',
        meta: { authRequired: true },
        component: () =>
          lazyLoadView(import('@views/pages/apps/email/inbox')),
      },
      {
        path: 'read',
        name: 'Read Email',
        meta: { authRequired: true },
        component: () =>
          lazyLoadView(import('@views/pages/apps/email/reademail')),
      },
      {
        path: 'compose',
        name: 'Compose Email',
        meta: { authRequired: true },
        component: () =>
          lazyLoadView(import('@views/pages/apps/email/emailcompose')),
      },
    ],
  }
];

const projectAppsRoutes = [
  {
    path: '/apps/project',
    name: 'Project',
    icon: 'briefcase',
    meta: { authRequired: true },
    // create a container component
    component: {
      render(c) {
        return c('router-view')
      },
    },
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
    children: [
      {
        path: 'list',
        name: 'List',
        meta: { authRequired: true },
        component: () =>
          lazyLoadView(import('@views/pages/apps/project/list')),
      },
      {
        path: 'detail',
        name: 'Detail',
        meta: { authRequired: true },
        component: () =>
          lazyLoadView(import('@views/pages/apps/project/detail')),
      },
    ],
  }
];

const taskAppsRoutes = [
  {
    path: '/apps/task',
    name: 'Task',
    icon: 'bookmark',
    meta: { authRequired: true },
    // create a container component
    component: {
      render(c) {
        return c('router-view')
      },
    },
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
    children: [
      {
        path: 'list',
        name: 'Task List',
        meta: { authRequired: true },
        component: () =>
          lazyLoadView(import('@views/pages/apps/tasks/task-list')),
      },
      {
        path: 'task-board',
        name: 'Kanban Board',
        meta: { authRequired: true },
        component: () =>
          lazyLoadView(import('@views/pages/apps/tasks/task-board')),
      },
    ],
  }
];

const appsRoutes = [
  ...calendarAppsRoutes,
  ...emailAppsRoutes,
  ...projectAppsRoutes,
  ...taskAppsRoutes
]

// pages
const pagesRoutes = [
  {
    path: '/pages',
    name: 'Pages',
    icon: 'file-text',
    header: 'Custom',
    meta: { authRequired: true },
    // create a container component
    component: {
      render(c) {
        return c('router-view')
      },
    },
    children: [
      {
        path: 'starter',
        name: 'Starter',
        component: () => lazyLoadView(import('@views/pages/secondary/starter')),
      },
      {
        path: 'invoice',
        name: 'Invoice',
        component: () => lazyLoadView(import('@views/pages/secondary/invoice')),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => lazyLoadView(import('@views/pages/secondary/profile/')),
      },
      {
        path: 'activity',
        name: 'Activity',
        component: () =>
          lazyLoadView(import('@views/pages/secondary/activity')),
      },
      {
        path: 'pricing',
        name: 'Pricing',
        component: () => lazyLoadView(import('@views/pages/secondary/pricing')),
      },
    ],
  },
]

// ui
const uiRoutes = [
  {
    path: '/ui',
    name: 'UI Elements',
    icon: 'package',
    header: 'Components',
    meta: { authRequired: true },
    // create a container component
    component: {
      render(c) {
        return c('router-view')
      },
    },
    children: [
      {
        path: 'bootstrap',
        name: 'Bootstrap UI',
        component: () => lazyLoadView(import('@views/pages/ui/bootstrap/')),
      },
      {
        path: 'icons',
        name: 'Icons',
        // create a container component
        component: {
          render(c) {
            return c('router-view')
          },
        },
        children: [
          {
            path: 'feather',
            name: 'Feather',
            component: () =>
              lazyLoadView(import('@views/pages/ui/icons/feather')),
          },
          {
            path: 'unicons',
            name: 'Unicons',
            component: () =>
              lazyLoadView(import('@views/pages/ui/icons/unicons')),
          },
        ],
      },
      {
        path: 'widgets',
        name: 'Widgets',
        component: () => lazyLoadView(import('@views/pages/ui/widget/')),
      },
    ],
  },
]

// forms
const formsRoutes = [
  {
    path: '/forms',
    name: 'Forms',
    icon: 'file-text',
    meta: { authRequired: true },
    // create a container component
    component: {
      render(c) {
        return c('router-view')
      },
    },
    children: [
      {
        path: 'basic',
        name: 'Basic',
        component: () => lazyLoadView(import('@views/pages/ui/forms/basic')),
      },
      {
        path: 'advanced',
        name: 'Advanced',
        component: () => lazyLoadView(import('@views/pages/ui/forms/advanced')),
      },
      {
        path: 'validation',
        name: 'Validation',
        component: () =>
          lazyLoadView(import('@views/pages/ui/forms/validation')),
      },
      {
        path: 'wizard',
        name: 'Wizard',
        component: () => lazyLoadView(import('@views/pages/ui/forms/wizard/')),
      },
      {
        path: 'editor',
        name: 'Editor',
        component: () => lazyLoadView(import('@views/pages/ui/forms/editor')),
      },
      {
        path: 'uploads',
        name: 'File Uploads',
        component: () => lazyLoadView(import('@views/pages/ui/forms/uploads')),
      },
    ],
  },
]

// Animal
const animalRoutes = [
  {
    path: '/animal',
    name: 'Animal',
    icon: 'tag',
    meta: { authRequired: true },
    // create a container component
    component: {
      render(c) {
        return c('router-view')
      },
    },
    children: [
      {
        path: 'cadastroanimal',
        name: 'Cadastro de Animal',
        component: () => lazyLoadView(import('@views/pages/gado/animal/cadastro')),
      },
      
      {
        path: 'listaranimal',
        name: 'Listar Animal',
        component: () => lazyLoadView(import('@views/pages/gado/animal/listar')),
      },
     
    ],
  },
]


// Dieta
const dietaRoutes = [
  {
    path: '/dieta',
    name: 'Dieta',
    icon: 'file',
    meta: { authRequired: true },
    // create a container component
    component: {
      render(c) {
        return c('router-view')
      },
    },
    children: [
      {
        path: 'cadastrodieta',
        name: 'Cadastro de Dieta',
        component: () => lazyLoadView(import('@views/pages/gado/dieta/cadastrar')),
      },
      
      {
        path: 'listardieta',
        name: 'Listar Dieta',
        component: () => lazyLoadView(import('@views/pages/gado/dieta/listar')),
      },
    ],
  },
]

// Dieta
const colaboradorRoutes = [
  {
    path: '/colaborador',
    name: 'Colaborador',
    icon: 'users',
    meta: { authRequired: true },
    // create a container component
    component: {
      render(c) {
        return c('router-view')
      },
    },
    children: [
      {
        path: 'cadastrocolaborador',
        name: 'Cadastro Colaborador',
        component: () => lazyLoadView(import('@views/pages/gado/colaborador/cadastrar')),
      },
      
      {
        path: 'listarcolaborador',
        name: 'Listar Colaborador',
        component: () => lazyLoadView(import('@views/pages/gado/colaborador/listar')),
      },
    ],
  },
]

// Programa
const programaRoutes = [
  {
    path: '/programa',
    name: 'Programa',
    icon: 'file',
    meta: { authRequired: true },
    component: () => lazyLoadView(import('@views/pages/mariopenna/listar_programas')),
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
  },
]

// Residente
const residenteRoutes = [
  {
    path: '/residente',
    name: 'Residentes',
    icon: 'users',
    meta: { authRequired: true },
    component: () => lazyLoadView(import('@views/pages/mariopenna/listar_residentes')),
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
  },
]

// Atividade
const atividadeRoutes = [
  {
    path: '/atividade',
    name: 'Atividades Acadêmicas',
    icon: 'clipboard',
    meta: { authRequired: true },
    component: () => lazyLoadView(import('@views/pages/mariopenna/listar_atividades')),
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
  },
]

// tables
const tablesRoutes = [
  {
    path: '/tables',
    name: 'Tables',
    icon: 'grid',
    meta: { authRequired: true },
    // create a container component
    component: {
      render(c) {
        return c('router-view')
      },
    },
    children: [
      {
        path: 'basic',
        name: 'Basic Tables',
        component: () =>
          lazyLoadView(import('@views/pages/ui/tables/basic-table')),
      },
      {
        path: 'advanced',
        name: 'Advanced Tables',
        component: () =>
          lazyLoadView(import('@views/pages/ui/tables/advanced-table')),
      },
    ],
  },
]

// charts
const chartsRoutes = [
  {
    path: '/charts',
    name: 'Charts',
    icon: 'pie-chart',
    component: () => lazyLoadView(import('@views/pages/ui/chart/')),
    meta: { authRequired: true },
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
  },
]


const authProtectedRoutes = [
  ...dashboardRoutes,
  ...programaRoutes,
  ...residenteRoutes,
  ...atividadeRoutes,

  //...appsRoutes,
  //...pagesRoutes,
  //...uiRoutes,
  //...formsRoutes,
  //...chartsRoutes,
  //...tablesRoutes
]
const allRoutes = [...authRoutes, ...authProtectedRoutes, ...errorPagesRoutes]

export { allRoutes, authProtectedRoutes }

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require('@components/_loading').default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    // error: require('@views/_timeout').default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    },
  })
}
