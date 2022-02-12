import App from './App.vue'
import viteSSR, { ClientOnly } from 'vite-ssr'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createHead } from '@vueuse/head'

const routes = setupLayouts(generatedRoutes)

export default viteSSR(App, { routes }, async (ctx) => {
  // install all modules under `modules/`
  Object.values(import.meta.globEager('./modules/*.ts')).map((i) => i.install?.(ctx))

  const { app, router, initialState } = ctx

  const head = createHead()
  app.use(head)

  app.component(ClientOnly.name, ClientOnly)

  // Freely modify initialState and it will be serialized later
  if (import.meta.env.SSR) {
    // initialState.test = 'This should appear in page-view-source'
  } else {
    // In browser, initialState will be hydrated with data from SSR
    // console.log('Initial state:', initialState)
  }

  // As an example, make a getPageProps request before each route navigation
  router.beforeEach(async (to, from, next) => {
    if (!!to.meta.state && (!import.meta.env.DEV || import.meta.env.SSR)) {
      // This route has state already (from server) so it can be reused.
      return next()
    }

    // `isClient` here is a handy way to determine if it's SSR or not.
    // However, it is a runtime variable so it won't be tree-shaked.
    // Use Vite's `import.meta.env.SSR` instead for tree-shaking.
    // const baseUrl = isClient ? '' : url.origin

    // Explanation:
    // The first rendering happens in the server. Therefore, when this code runs,
    // the server makes a request to itself (running the code below) in order to
    // get the current page props and use that response to render the HTML.
    // The browser shows this HTML and rehydrates the application, turning it into
    // a normal SPA. After that, subsequent route navigation runs this code below
    // from the browser and get the new page props, which is this time rendered
    // directly in the browser, as opposed to the first page rendering.

    // try {
    //   // Get our page props from our custom API:
    //   const res = await fetch(`${baseUrl}/api/get-page-props?path=${encodeURIComponent(to.path)}&name=${to.name}&client=${isClient}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   })

    //   // During SSR, this is the same as modifying initialState
    //   to.meta.state = await res.json()
    // } catch (error) {
    //   console.error(error)
    //   // redirect to error route conditionally
    // }

    next()
  })

  return { head }
})
