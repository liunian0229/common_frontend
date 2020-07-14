/* Layout */
import Layout from '@/layout'

export default {
  path: 'external-link',
  component: Layout,
  children: [
    {
      path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
      meta: { title: 'External Link', icon: 'link' }
    }
  ]
}
