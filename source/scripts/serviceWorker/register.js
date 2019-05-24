import data from '@data'

const { PATH } = data

export default () => {
  if (!navigator.serviceWorker) return console.log('Service worker isn\'t supported')

  navigator.serviceWorker.register(`/${PATH.file.serviceWorker.sw}`)
    .catch((error) => { console.error('Service Worker Error', error) })
}
