import Clipboard from 'clipboard'
interface Options {
  appendToBody: boolean
}
export default (opts?: Options) => {
  const appendToBody =
    opts?.appendToBody === undefined ? true : opts.appendToBody
  return {
    toClipboard(text: string, container?: HTMLElement) {
      return new Promise((resolve, reject) => {
        const fakeEl = document.createElement('button')
        const clipboard = new Clipboard(fakeEl, {
          text: () => text,
          action: () => 'copy',
          container: container !== undefined ? container : document.body
        })
        clipboard.on('success', (e) => {
          clipboard.destroy()
          resolve(e)
        })
        clipboard.on('error', (e) => {
          clipboard.destroy()
          reject(e)
        })
        if (appendToBody) document.body.appendChild(fakeEl)
        fakeEl.click()
        if (appendToBody) document.body.removeChild(fakeEl)
      })
    }
  }
}
