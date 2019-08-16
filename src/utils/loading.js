import EventEmitter from 'eventemitter3'

export const LoadingEmitter = new EventEmitter()

const showLoadingModal = () => {
  setTimeout(() => LoadingEmitter.emit('SHOW_LOADING_MODAL'), 0)
}

const hideLoadingModal = () => {
  setTimeout(() => LoadingEmitter.emit('HIDE_LOADING_MODAL'), 0)
}

export const Loading = {
  show: showLoadingModal,
  hide: hideLoadingModal
}
