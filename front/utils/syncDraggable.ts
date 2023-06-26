import { DataStreamWriter } from './dataStreamWriter'
import interact from 'interactjs'

export class SyncDraggable {
  writer: DataStreamWriter

  constructor(writer: DataStreamWriter) {
    this.writer = writer
  }

  private dragMoveListener(event: any): void {
    const target = event.target as HTMLElement
    const dataX = target.getAttribute('data-x') as string
    const dataY = target.getAttribute('data-y') as string
    const x = (parseFloat(dataX) || 0) + event.dx
    const y = (parseFloat(dataY) || 0) + event.dy
    const answer = target.getAttribute('data-answer') as string

    this.writer.writeMyAvatarParams(target.id, x, y, answer)

    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
    target.setAttribute('data-draggable', 'draggable')
  }

  setDraggable(uid: string): void {
    interact(`#${uid}`).draggable({
      inertia: true,
      autoScroll: true,
      listeners: {
        move: this.dragMoveListener.bind(this)
      },
      modifiers: [
        interact.modifiers.restrict({
          restriction: '#main-container',
          endOnly: true
        })
      ]
    })
  }

  unsetDraggable(uid: string): void {
    interact(`#${uid}`).unset()
  }

  setDropzone(answer: string, uid: string): void {
    interact(`#${answer}`).dropzone({
      accept: `#${uid}`,
      overlap: 0.5,
      ondragenter: function (event) {
        const draggableElement = event.relatedTarget
        draggableElement.dataset.answer = answer
      },
      ondragleave: function (event) {
        const draggableElement = event.relatedTarget
        draggableElement.dataset.answer = ''
      }
    })
  }
}
