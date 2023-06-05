import { DataStreamWriter } from '~/utils/dataStreamWriter'

export const useAnnouncer = (writer: DataStreamWriter) => {
  const announcement = ref('ここに問題')

  const announceSetQuestion = (quizNumber: number) => {
    announcement.value = `${quizNumber}問目！`
    writer.writeQuizNumber(quizNumber)
  }

  const announceQuestion = (question: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        writer.writeQuiz(question)
        announcement.value = question
        resolve()
      }, 2000)
    })
  }

  const announceStart = (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        writer.writeStartQuiz()
        announcement.value = 'スタート！'
        resolve()
      }, 3000)
    })
  }

  const announceStop = (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        writer.writeStopQuiz()
        announcement.value = 'ストップ！'
        resolve()
      }, 8000)
    })
  }

  const announcePreparation = (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        writer.writePreparation()
        announcement.value = '正解は・・'
        resolve()
      }, 3000)
    })
  }

  const announceCorrectAnswer = (correctAnswer: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        writer.writeCorrectAnswer(correctAnswer)
        announcement.value = correctAnswer
        resolve()
      }, 3000)
    })
  }

  const announceExplanation = (explanation: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        writer.writeExplanation(explanation)
        announcement.value = explanation
        resolve()
      }, 2000)
    })
  }

  const announceReset = (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        writer.writeEmpty()
        announcement.value = ''
        resolve()
      }, 3000)
    })
  }

  return {
    announcement,
    announceSetQuestion,
    announceQuestion,
    announceStart,
    announceStop,
    announcePreparation,
    announceCorrectAnswer,
    announceExplanation,
    announceReset
  }
}
