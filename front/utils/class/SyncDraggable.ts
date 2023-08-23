import { AvatarParams } from '~/types/avatarParams'
import Avatar from '~/utils/class/Avatar'
import interact from 'interactjs'

export class SyncDraggable {
  dragMoveListener(event: Interact.InteractEvent, avatar: Avatar): void {
    const target = event.target as HTMLElement
    const dataX = target.getAttribute('data-x') as string
    const dataY = target.getAttribute('data-y') as string
    const x = ((parseFloat(dataX) || 0) + event.dx).toString()
    const y = ((parseFloat(dataY) || 0) + event.dy).toString()
    const answer = target.getAttribute('data-answer') as string
    const avatarParams: AvatarParams = {
      id: avatar.avatarId,
      x: x,
      y: y,
      answer: answer
    }
    avatar.skywayDataStream!.writeAvatarParams(avatarParams)
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }

  setDraggable(avatar: Avatar): void {
    interact(`#${avatar.avatarId}`).draggable({
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

  unsetDraggable(avatar: Avatar): void {
    interact(`#${avatar.avatarId}`).unset()
  }

  setDropzone(answer: string, avatar: Avatar): void {
    interact(`#${answer}`).dropzone({
      accept: `#${avatar.avatarId}`,
      overlap: 0.5,
      ondragenter: (event) => {
        const draggableElement = event.relatedTarget
        draggableElement.dataset.answer = answer
      },
      ondragleave: (event) => {
        const draggableElement = event.relatedTarget
        draggableElement.dataset.answer = ''
      }
    })
  }
}

export default SyncDraggable
