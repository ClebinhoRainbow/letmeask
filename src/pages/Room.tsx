import { useParams } from 'react-router';
import { useState } from 'react';
import logoImg  from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import "../styles/room.scss"
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { FormEvent } from 'react';
import { useEffect } from 'react';
type FirebaseQuestions = Record<string, {
   
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isHighLighted: boolean;
    isAnswerd: boolean;
}>
type RoomParams = {
    id: string;
}
type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isHighLighted: boolean;
    isAnswerd: boolean;
}
export function Room(){
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState("");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title,setTitle]= useState("");
    const roomId = params.id;

    useEffect(()=>{
        const roomRef = database.ref(`rooms/${roomId}`);
        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.roomQuestions ?? {};
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key,value])=> {
                return{
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswerd: value.isAnswerd
                }

            })
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
    },[roomId]);

    async function handleSendQuestion(event: FormEvent){
        event.preventDefault();
        if(newQuestion.trim() === ""){
            return;
        }
        if(!user){
            throw new Error("You must be logged in");
        }
        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighLighted: false,
            isAnswerd: false
        };
        await database.ref(`rooms/${roomId}/questions`).push(question);
        setNewQuestion("");
    }
    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetMeAsk" />
                    <RoomCode code={roomId}/>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                <form onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder="O que voce quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    
                    />
                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta,<button> faça seu login</button>. </span>
                        )}
                        
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                
            </main>

        </div>
    );
}