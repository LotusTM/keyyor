import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Home extends Vue {
  render () {
    return (
      <div>

        <header class='h-flex h-flex-x--between h-flex-y--center h-childs-displace h-margin-bottom+'>

          <div class='h-flex h-flex-y--center'>
            <h1 class='h-margin-bottom0 h-margin-right'>Главная</h1>
          </div>

          <div>
            Side
          </div>

        </header>

        <p>Hello</p>
      </div>
    )
  }
}
