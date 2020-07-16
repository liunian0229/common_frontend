/* Layout */
import Layout from '@/layout'

export default {
  path: '/tool',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Tool',
  meta: {
    title: 'Tool',
    icon: 'component'
  },
  children: [
    {
      path: 'md5',
      component: () => import('@/views/tool/md5'),
      name: 'md5',
      meta: { title: '生成 MD5' }
    },
    {
      path: 'xml-to-excel',
      component: () => import('@/views/tool/xml-to-excel'),
      name: '',
      meta: { title: 'XML 转 EXCEL' }
    }
  ]
}
