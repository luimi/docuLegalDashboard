import { History } from 'lucide-react';
import React, { FC, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { FileWarning } from 'lucide-react';
import Parse from 'parse';

interface PromptProps {
    id: string;
    value: string;
    onChange: (value: string) => void;
    title?: string;
    info?: string;
    code?: string;
}

const Prompt: FC<PromptProps> = ({ id, value, onChange, title, info, code }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<any>([]);

    React.useEffect(() => {
        if (open) {
            getHistory();
        }
    }, [open]);

    const getHistory = async () => {
        setLoading(true);
        const result = await new Parse.Query('PromptHistory').equalTo('code', code).descending('createdAt').find();
        setHistory(result)
        setLoading(false);
    }
    return (
        <div className="md:col-span-2">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                {title}
            </label>
            <textarea
                id={id}
                value={value}
                onChange={e => onChange(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe cómo debe generarse el documento..."
                required
            />
            <div className="flex justify-between">
                <p className="text-sm text-gray-500 mt-1 text-left">
                    {info}
                </p>
                <p className="text-right">
                    {code && <History className="inline h-4 w-4 text-gray-500" onClick={()=> setOpen(true)}/>}
                </p>
            </div>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <History className="inline h-5 w-5 text-gray-500" /> Historial de prompts
                                </h3>
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {loading ? (
                                        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                                            <svg className="animate-spin h-8 w-8 mb-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                            </svg>
                                            <span>Cargando historial...</span>
                                        </div>
                                    ) : history.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                                            <FileWarning className="h-8 w-8 mb-2" />
                                            <span>No hay prompts guardados aún.</span>
                                        </div>
                                    ) : (
                                        <ul className="space-y-4">
                                            {history.map((item: any, idx: number) => (
                                                <li key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex flex-col gap-2">
                                                    <div className="text-gray-800 text-sm whitespace-pre-line break-words max-h-24 overflow-y-auto">{item.get('prompt')}</div>
                                                    <div className="flex justify-between items-center mt-2">
                                                        <span className="text-xs text-gray-500">{item.get('createdAt').toLocaleString()}</span>
                                                        <button
                                                            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                                                            onClick={() => { onChange(item.get('prompt')); setOpen(false); }}
                                                        >
                                                            Usar
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default Prompt;