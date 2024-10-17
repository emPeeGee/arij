import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../components/NotFound.vue'

// TODO: revise routing one more time
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: 'kanban' },
    { path: '/home', name: 'home', component: HomeView },
    {
      path: '/projects',
      name: 'Projects',
      meta: { breadCrumb: 'Projects' },
      // component: null,
      children: [
        {
          path: ':id',
          name: 'Id',
          // component: null,
          children: [
            {
              path: 'kanban',
              name: 'Kanban board',
              meta: { breadCrumb: 'Kanban board' },
              component: () => import('../views/KanbanBoardView.vue')
            },
            {
              path: 'settings',
              name: 'Settings',
              meta: { breadCrumb: 'Settings' },
              component: () => import('../views/ProjectSettingsView.vue')
            },
            {
              path: '/:pathMatch(.*)*',
              component: NotFound
            }
          ]
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
