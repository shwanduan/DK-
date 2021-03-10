import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/firstScreen'
import supControl from '@/views/firstScreen/supControl'

import Security from '@/views/security'
import Project from '@/views/security/project'
import Video from '@/views/video'
import Try from "@/views/try"

Vue.use(VueRouter)

const routes = [

  {
    path: '/security', 
    component: Security
  },
  {
    path: '/project/:id', 
    name:'project',
    component: Project
  },
  {
    path: '/',
    redirect: '/firstScreen'
  },
  {
    path: '/firstScreen',
    component: Home
  },
  {
    path: '/supControl',
    component: supControl
  },
  {
    path: '/video',
    component: Video
  }

]

const router = new VueRouter({
  routes
})

export default router
