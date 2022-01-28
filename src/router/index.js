import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Referrals from '../views/Referrals.vue'
import Masters from '../views/Masters.vue'
import Users from '../views/Users.vue'
import Applications from '../views/Applications.vue'
import CreateApplication from '../views/CreateApplication.vue'
import AcceptedApplications from '../views/AcceptedApplications.vue'
import StudentApplications from '../views/StudentApplications.vue'
import Error from '../views/Error.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'Error',
    component: Error
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: "/error",
    name: "Error",
    component: Error,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/referrals',
    name: 'Referrals',
    component: Referrals,
    meta: {
      requiresAuth: true,
      secretaryAuth: false,
      studentAuth: false,
      teacherAuth: true,
    },
  },
  {
    path: '/masters',
    name: 'Masters',
    component: Masters,
    meta: {
      requiresAuth: true,
      secretaryAuth: true,
      studentAuth: false,
      teacherAuth: false,
    },
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {
      requiresAuth: true,
      secretaryAuth: true,
      studentAuth: false,
      teacherAuth: false,
    },
  },
  {
    path: '/applications',
    name: 'Applications',
    component: Applications,
    meta: {
      requiresAuth: true,
      secretaryAuth: true,
      studentAuth: false,
      teacherAuth: false,
    },
  },
  {
    path: '/applications-accepted',
    name: 'AcceptedApplications',
    component: AcceptedApplications,
    meta: {
      requiresAuth: true,
      secretaryAuth: false,
      studentAuth: false,
      teacherAuth: true,
    },
  },
  {
    path: '/applications-student',
    name: 'StudentApplications',
    component: StudentApplications,
    meta: {
      requiresAuth: true,
      secretaryAuth: false,
      studentAuth: true,
      teacherAuth: false,
    },
  },
  {
    path: '/create-application',
    name: 'CreateApplication',
    component: CreateApplication,
    meta: {
      requiresAuth: true,
      secretaryAuth: false,
      studentAuth: true,
      teacherAuth: false,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(localStorage.getItem("user"));
    if (!authUser || !authUser.token) {
      next({ name: "Home" });
    } else if (to.meta.secretaryAuth) {
      const authUser = JSON.parse(localStorage.getItem("user"));
      if (authUser.type === "Secretary") {
        next();
      } else {
        next({ name: "Error" });
      }
    } else if (to.meta.studentAuth) {
      const authUser = JSON.parse(localStorage.getItem("user"));
      if (authUser.type === "Student") {
        next();
      } else {
        next({ name: "Error" });
      }
    } else if (to.meta.teacherAuth) {
      const authUser = JSON.parse(localStorage.getItem("user"));
      if (authUser.type === "Teacher") {
        next();
      } else {
        next({ name: "Error" });
      }
    }
  } else {
    next();
  }
});
export default router
