import { useEffect, useState } from "react";

type Message = {
    text: string;
    id: string;
    timeLeft: number;
};


const timeoutLength = 5_000;

export default function Notification({
    msg,
    handleDelete,
}: {
    msg: Message;
    handleDelete: (id: string) => void;
    index: number;
}) {

    const [show, setShow] = useState(false);


    useEffect(() => {
        setShow(true);
        const timeoutToHide = setTimeout(() => {
            setShow(false);

        }, timeoutLength - msg.timeLeft);


        return () => { clearTimeout(timeoutToHide) };
    }, [msg.id, msg.timeLeft, handleDelete]);

    // delete message 0.8s after it gets hidden
    useEffect(() => {
        const timeoutToDelete = setTimeout(() => {
            handleDelete(msg.id);
        }, (timeoutLength - msg.timeLeft) + 800);

        return () => { clearTimeout(timeoutToDelete); };
    }, [msg.id, msg.timeLeft, handleDelete]);

    if (!show) return null;

    return <div className='notification'>{msg.text}</div>;
}