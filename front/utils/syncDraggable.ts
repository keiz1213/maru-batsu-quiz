import { DataStreamWriter } from './dataStreamWriter'
import interact from 'interactjs'

export class SyncDraggable {
  writer: DataStreamWriter

  constructor(writer: DataStreamWriter) {
    this.writer = writer
  }

  dragMoveListener(event: any): void {
    const target = event.target as HTMLElement
    const dataX = target.getAttribute('data-x') as string
    const dataY = target.getAttribute('data-y') as string
    const x = (parseFloat(dataX) || 0) + event.dx
    const y = (parseFloat(dataY) || 0) + event.dy

    this.writer.writeMyAvatarParams(target.id, x, y)

    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }

  setDraggable(uid: string): void {
    interact(`#${uid}`).draggable({
      inertia: true,
      autoScroll: true,
      listeners: {
        move: this.dragMoveListener.bind(this)
      }
    })
  }

  setDropzone(id: string, uid: string): void {
    interact(`#${id}`).dropzone({
      accept: `#${uid}`,
      overlap: 0.5,
      ondragenter: function(event) {
        const draggableElement = event.relatedTarget
        const dropzoneElement = event.target

        console.log(dropzoneElement.id)
        draggableElement.classList.add('w-32')
      },
      ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('bg-indigo-700')
        event.relatedTarget.classList.remove('w-32')
      },
    })
  }
}
