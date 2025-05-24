import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

const useTicket = () => {
    const [ticketRes, setTicketRes] = useState([]);
    const [loadingTicket, setLoadingTicket] = useState(false);
    const [nbreUnread, setNbreUnread] = useState(null);

    const getTicketRes = useCallback(async () => {
        setLoadingTicket(true);
        try {
            const res = await fetch("/api/ticket");
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setTicketRes(data.tickets);
        } catch (error) {
            console.log("Erreur lors de la récupération des tickets", error.message);
        } finally {
            setLoadingTicket(false);
        }
    }, []);

    const sendTicket = async({email, content}) => {
        const success = handleInputsError({email, content});
        if(!success) return;
        setLoadingTicket(true);
        try {
            const res = await fetch("/api/ticket", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({email, content})
            });
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.message);
            }
            toast.success("Merci, nous vous répondrons ultérieurement");
        } catch (error) {
            toast.error(error.message);
            console.log("Erreur lors de l'envoi de la demande", error.message);
        } finally {
            setLoadingTicket(false);
        }
    }

    const getNbreUnread = useCallback(async () => {
        setLoadingTicket(true);
        try {
            const res = await fetch("/api/ticket/notification");
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setNbreUnread(data.nbreTicketNotifiy);
        } catch (error) {
            console.error("Erreur lors de la récupération des tickets non lus:", error.message);
        } finally {
            setLoadingTicket(false);
        }
    }, []);

    const markAsSeen = async() => {
        setLoadingTicket(true);
        try {
            const res = await fetch('/api/ticket/notification', {
                method: "PUT"
            });
            getNbreUnread();
        } catch (error) {
            console.log("Erreur lors du marquage comme lu:", error.message);
        } finally {
            setLoadingTicket(false);
        }
    }

    return {sendTicket, loadingTicket, ticketRes, getTicketRes, getNbreUnread, nbreUnread, markAsSeen}
}

export default useTicket

const handleInputsError = ({email, content}) => {
    if(!email){
        toast.error("Veuillez fournir votre email");
        return false;
    }
    if(!content){
        toast.error("Veuillez saisir votre demande");
        return false;
    }
    return true;
}