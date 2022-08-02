import {getInitialData, saveQuestionAnswer, saveQuestion} from '../utils/api'
import {receiveQuestions, saveAnswerQuestion, addQuestion} from './questions'
import {receiveUsers, saveAnswerUser, addQuestionU} from './users'

export function handleData() {
    return (dispatch) => {
        return getInitialData().then(({users, questions}) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
        })
    }
}

export function handleSaveAnswer(data) {
    return (dispatch) => {
        saveQuestionAnswer(data)
      .then(() => {
        dispatch(saveAnswerQuestion(data));
        dispatch(saveAnswerUser(data));
      })
      .catch((e) => {
        console.warn("Error while saving answer: ", e);
      });
    }
}

export function handleAddQuestion(question){
    return (dispatch) => {
        saveQuestion(question)
      .then((data) => {
        dispatch(addQuestion(data))
        dispatch(addQuestionU(data))
      })
      .catch((e) => {
        console.warn("Error while adding question: ", e);
      });
    }
}