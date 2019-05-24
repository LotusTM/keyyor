import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class NotFound extends Vue {
  render () {
    return (
      <div>
        <div class='h-flex h-flex-y--center h-flex-x--center h-height-1/1 h-align--center'>
          <div>
            <h1>404</h1>
            <p>Страница не найдена</p>
            <p><router-link to='/'>на главную</router-link></p>
          </div>
        </div>
      </div>
    )
  }
}
