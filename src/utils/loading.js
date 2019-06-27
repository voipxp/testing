import EventEmitter from 'eventemitter3'

export const LoadingEmitter = new EventEmitter()
export const showLoadingModal = () => LoadingEmitter.emit('SHOW_LOADING_MODAL')
export const hideLoadingModal = () => LoadingEmitter.emit('HIDE_LOADING_MODAL')
