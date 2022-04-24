import React, { useEffect, useState } from 'react'
import { Button, Popover, Progress, Whisper } from 'rsuite';
import 'rsuite/Progress/styles/index.less';
import 'rsuite/Button/styles/index.less';
import ModalLottie from '../modal-lottie';
import { ShareIcon } from '../../svg';
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";

const speaker = (
    <Popover>
        <FacebookShareButton url={window.location.href}>
            <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={window.location.href}>
            <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={window.location.href}>
            <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
    </Popover>
);

const Infographics = ({ items, setOpen }) => {
    const [step, setStep] = useState(1)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setTimeout(() => {
            if (progress < 100) {
                setProgress(prevProgress => prevProgress + 2)
            } else {
                if (step === items.length)
                    setOpen(false)
                else
                    setStep(prevStep => prevStep < items.length ? prevStep + 1 : 1)
            }
        }, 100);

        return () => clearTimeout(interval)
    })

    useEffect(() => {
        setProgress(0)
    }, [step])

    return (
        <div id='infographics-container'>
            <div id='progress-bar-container'>
                {items.map((item, index) => (
                    <Progress.Line
                        key={index}
                        className='infographic-progress'
                        percent={step === index + 1 ? progress : 0}
                        showInfo={false}
                    />
                ))}
            </div>
            {items.map((item, index) => step === index + 1 && <ModalLottie key={index} item={item} />)}
            <div id='share-button-container'>
                <Whisper placement="top" trigger="click" controlId="control-id-click" speaker={speaker}>
                    <Button className='share-button' color="cyan" appearance="primary">
                        <ShareIcon style={{ marginRight: 10 }} /> Share
                    </Button>
                </Whisper>
            </div>
        </div>
    )
}

export default Infographics