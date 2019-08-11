import EventEmitter from 'eventemitter3'

export const LoadingEmitter = new EventEmitter()
export const showLoadingModal = () => {
  setTimeout(() => LoadingEmitter.emit('SHOW_LOADING_MODAL'), 0)
}
export const hideLoadingModal = () => {
  setTimeout(() => LoadingEmitter.emit('HIDE_LOADING_MODAL'), 0)
}

export default {
  show: showLoadingModal,
  hide: hideLoadingModal
}
