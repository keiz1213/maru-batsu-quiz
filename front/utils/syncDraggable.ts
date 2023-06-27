import { AvatarParams } from '~/types/AvatarParams'
import Avatar from './Avatar'
import interact from 'interactjs'

export class SyncDraggable {
  private static dragMoveListener(
    event: Interact.InteractEvent,
    avatar: Avatar
  ): void {
    const target = event.target as HTMLElement
    const dataX = target.getAttribute('data-x') as string
    const dataY = target.getAttribute('data-y') as string
    const x = ((parseFloat(dataX) || 0) + event.dx).toString()
    const y = ((parseFloat(dataY) || 0) + event.dy).toString()
    const answer = target.getAttribute('data-answer') as string
    const avatarParams: AvatarParams = {
      id: avatar.uid,
      x: x,
      y: y,
      answer: answer
    }

    avatar.writer?.sendMyAvatarParams(avatar, avatarParams)

    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
    target.setAttribute('data-draggable', 'draggable')
  }

  static setDraggable(avatar: Avatar): void {
    interact(`#${avatar.uid}`).draggable({
      inertia: true,
      autoScroll: true,
      listeners: {
        move: (event: Interact.InteractEvent) =>
          this.dragMoveListener(event, avatar)
      },
      modifiers: [
        interact.modifiers.restrict({
          restriction: '#main-container',
          endOnly: true
        })
      ]
    })
  }

  static unsetDraggable(avatar: Avatar): void {
    interact(`#${avatar.uid}`).unset()
  }

  static setDropzone(answer: string, avatar: Avatar): void {
    interact(`#${answer}`).dropzone({
      accept: `#${avatar.uid}`,
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
