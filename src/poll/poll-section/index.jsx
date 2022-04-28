import React, { useEffect, useState } from 'react'
import { Drawer, Loader } from 'rsuite'
import './../index.css';
import 'rsuite/Loader/styles/index.less';
import 'rsuite/Drawer/styles/index.less';
import 'rsuite/Placeholder/styles/index.less';
import { getToken } from '../../utils/localstorage';
import { BASE_URL } from '../../utils/constants';
import { InfoIcon } from '../../svg';

function PollSection() {
    const [pollIds, setPollIds] = useState(null)
    const [pollId, setPollId] = useState(null)
    const [poll, setPoll] = useState(null)
    const [loading, setLoading] = useState(false)
    const [voting, setVoting] = useState(false)
    const [showDrawer, setShowDrawer] = useState(false)
    const token = getToken()

    useEffect(() => {
        if (!pollIds) {
            const pollIds = localStorage.getItem('pollIds')
            setPollIds(JSON.parse(pollIds))
        }
    })


    useEffect(() => {
        if (token) {
            const headers = new Headers();
            headers.append("Authorization", "Bearer " + token)
            setLoading(true)

            fetch(`${BASE_URL}/v1/api/statistics/polls?source=HUB&frequency=DAILY`, { headers, method: 'GET' })
                .then(response => response.json())
                .then(result => {
                    const { success, data } = result

                    if (success) {
                        const { poll, result } = data
                        const { id, questions } = poll ? poll : result

                        if (questions.length > 0) {
                            setPollId(id)
                            setPoll(questions[0])
                        }
                    }
                })
                .catch(error => {
                    console.log(error.message);
                })
                .finally(() => setLoading(false))
        }
    }, [])

    const formattedPercent = (percent) => Math.round((percent + Number.EPSILON) * 100) / 100

    const vote = (pollQuestionId, pollQuestionOptionId) => {
        if (!pollIds) {
            const headers = new Headers();
            headers.append("Authorization", "Bearer " + token)
            headers.append("Content-Type", "application/json")
            setVoting(true)
            const pollIds = {
                pollId,
                pollQuestionId,
                pollQuestionOptionId
            }
            const body = [pollIds]

            if (token) {
                fetch(`${BASE_URL}/v1/api/statistics/polls/answer`, { headers, method: 'POST', body: JSON.stringify(body) })
                    .then(response => response.json())
                    .then(result => {
                        const { success, data } = result

                        if (success) {
                            const { questions } = data

                            if (questions.length > 0) {
                                localStorage.setItem('pollIds', JSON.stringify(pollIds))
                                setPollIds(pollIds)
                                setPoll(questions[0])
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
                    .finally(() => setVoting(false))
            }
        }
    }

    return (
        <div style={{ margin: '0px 30px', marginTop: -90 }}>
            <div id='poll-section'>
                {!loading
                    ? poll
                        ? <div id='poll-container'>
                            {voting && <Loader style={{ zIndex: 2 }} center size='lg' vertical backdrop />}
                            <p id='title'>Pregunta del día <span style={{ cursor: 'pointer', marginLeft: 5 }} onClick={() => setShowDrawer(true)}><InfoIcon /></span></p>
                            <p id='poll-title'>{poll.question}</p>
                            {poll.options.map((option, index) => (
                                <div
                                    className='options-container'
                                    key={index}
                                    style={{
                                        cursor: pollIds ? 'not-allowed' : 'pointer'
                                    }}
                                    onClick={() => vote(poll.id, option.id)}
                                >
                                    <div className={pollIds && option.id === pollIds.pollQuestionOptionId ? 'option-container-selected' : 'option-container'}>
                                        <div
                                            className={pollIds && option.id === pollIds.pollQuestionOptionId ? 'percentage-area-selected' : 'percentage-area'}
                                            style={{
                                                width: option.percent ? `${option.percent}%` : '0px',
                                                transition: 'all 1s ease-out'
                                            }}
                                        />
                                        <p className='option-title'>{option.name}</p>
                                        {option.percent && <p className='option-percent'>{formattedPercent(option.percent)} %</p>}
                                    </div>
                                </div>
                            ))}
                            <p className='instruction-text'>Selecciona 1 respuesta y descubre lo que opina el resto de la comunidad.</p>
                        </div>
                        : <div id='poll-container'>
                            <p id='poll-title' style={{ margin: '0px auto' }}>No hay encuesta para hoy</p>
                        </div>
                    : <div id='poll-container'>
                        <Loader center size='lg' vertical backdrop />
                    </div>
                }
                <Drawer placement='bottom' size='lg' open={showDrawer} onClose={() => setShowDrawer(false)}>
                    <Drawer.Header>
                        <p className='modal-title'>
                            Pregunta del día
                        </p>
                    </Drawer.Header>
                    <Drawer.Body>
                        <div>
                            <p className='content-title'>
                                ¿Cómo funciona?
                            </p>
                            <p className='content-text'>
                                La pregunta del día es una serie diaria de preguntas, creadas y seleccionadas para ti con la finalidad de que conozcas la opinión de la comunidad Jefa sobre ciertas temáticas.
                            </p>
                            <p className='content-text'>
                                Tu participación es completamente voluntaria :)
                            </p>
                            {/* <div className='likes-container'>
                                <div className='like-survey'>
                                    <p className='like-text'>
                                        ¿Esto te pareció útil?
                                    </p>
                                </div>
                            </div> */}
                        </div>
                    </Drawer.Body>
                </Drawer>
            </div>
        </div>
    )
}

export default PollSection