import ServiceLocator from './serviceLocator'

class DependencyInjection {
  static configure(express: any) {
    /*consign()
      .include('/03_infra/validation.ts')
      .then('/api/comments')
      .then('/api/views')
      .then('/api/likes')
      .then('/api/messages')
      .into(express)
    */
    express.ServiceLocator = new ServiceLocator(express)
  }
}

export default DependencyInjection
