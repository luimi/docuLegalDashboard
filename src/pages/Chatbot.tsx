
import React, { useEffect, useState } from 'react';
import Parse from 'parse';

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
        alert('Aun no implementado');
        //TODO save prompt to Parse Config
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
                        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                            Prompt
                        </label>
                        <textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Escribe tu prompt para el chatbot..."
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Escribe una instrucción o pregunta para el chatbot.
                        </p>
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
