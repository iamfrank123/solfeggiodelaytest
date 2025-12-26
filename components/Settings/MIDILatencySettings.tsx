'use client';

import { useState, useEffect } from 'react';
import { midiManager } from '@/lib/midi/web-midi';
import { useTranslation } from '@/context/LanguageContext';

export default function MIDILatencySettings() {
    const { t } = useTranslation();
    const [offsetMs, setOffsetMs] = useState(25);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        const config = midiManager.getLatencyCompensation();
        setOffsetMs(config.offsetMs);
    }, []);

    const handleOffsetChange = (newOffset: number) => {
        setOffsetMs(newOffset);
        midiManager.setLatencyCompensation(newOffset);
    };

    return (
        <div className="relative">
            {/* Toggle Button */}
            <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 transition-colors"
            >
                <span className="text-lg">🎹</span>
                <span className="text-sm font-medium">MIDI Latency: {offsetMs}ms</span>
            </button>

            {/* Settings Panel */}
            {showSettings && (
                <div className="absolute top-full mt-2 right-0 bg-white p-6 rounded-xl shadow-xl border border-blue-100 z-50 min-w-[400px]">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800">
                            🎹 Compensazione Latenza MIDI
                        </h3>
                        <button
                            onClick={() => setShowSettings(false)}
                            className="text-gray-400 hover:text-gray-600 text-xl"
                        >
                            ×
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Slider */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Offset Latenza (ms)
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={offsetMs}
                                    onChange={(e) => handleOffsetChange(Number(e.target.value))}
                                    className="flex-1 accent-blue-600"
                                />
                                <span className="text-2xl font-bold text-blue-600 min-w-[4ch]">
                                    {offsetMs}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Anticipa la valutazione degli eventi MIDI per compensare il ritardo hardware
                            </p>
                        </div>

                        {/* Calibration Guide */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h4 className="font-bold text-blue-800 mb-2 text-sm">
                                📖 Guida alla Calibrazione
                            </h4>
                            <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                                <li>Avvia la modalità Rhythm con metronomo attivo</li>
                                <li>Suona la tastiera MIDI perfettamente a tempo con il metronomo</li>
                                <li>Se ricevi feedback "Mancato" o "Buono" invece di "Perfetto", aumenta l'offset</li>
                                <li>Regola finché non ottieni costantemente feedback "Perfetto"</li>
                            </ol>
                        </div>

                        {/* Quick Presets */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleOffsetChange(0)}
                                className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium transition-colors"
                            >
                                Disabilita (0ms)
                            </button>
                            <button
                                onClick={() => handleOffsetChange(25)}
                                className="flex-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-xs font-medium transition-colors"
                            >
                                Default (25ms)
                            </button>
                            <button
                                onClick={() => handleOffsetChange(50)}
                                className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium transition-colors"
                            >
                                Alto (50ms)
                            </button>
                        </div>

                        {/* Info */}
                        <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                            <p className="text-xs text-amber-800">
                                <strong>💡 Suggerimento:</strong> La latenza tipica MIDI è 20-30ms.
                                Inizia con 25ms e regola in base al tuo hardware.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
