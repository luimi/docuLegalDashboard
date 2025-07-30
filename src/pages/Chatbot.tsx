
import React, { useEffect, useState } from 'react';
import Parse from 'parse';
import Prompt from '../components/Prompt';
import { saveNewPrompt } from '../utils/promptHistoryCtrl';


const Chatbot: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    

    useEffect(() => {
        getPrompt();
    }, []);
    const getPrompt = async () => {
        const config = await Parse.Config.get();
        setPrompt(config.get('chatPrompt') || '');
    }
    const savePrompt = async () => {
        const config = await Parse.Config.get();
        if(config.get('chatPrompt') !== prompt) {
            saveNewPrompt(prompt, 'chatbot');
        }

        await Parse.Cloud.run('saveConfig', { key: 'chatPrompt', value: prompt });
        alert('Guardado correctamente');
    }
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Chatbot</h1>
                    <p className="text-gray-600 mt-2">Configuración de chatbot</p>
                </div>
            </div>
            <div className="mx-auto mt-10">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div>
                        <Prompt id="prompt" value={prompt} onChange={setPrompt} title="Instrucción del Chatbot" info="Define cómo debe responder el chatbot a las preguntas de los usuarios." code='chatbot'/>'
                        <div className="flex justify-end mt-6">
                            <button
                                type="button"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow"
                                onClick={savePrompt}
                            >
                                Guardar cambios
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
