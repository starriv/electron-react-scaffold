import Home from '../views/home/index'
import NotFound from '../components/not-found/index'

const routes = [
  { path: '/', exact: true, component: Home },
  {
    path: '*',
    component: NotFound,
  },
]

export default routes
