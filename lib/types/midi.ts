// MIDI-related types for WebMIDI API

export interface MIDIInputDevice {
    id: string;
    name: string;
    manufacturer: string;
    state: 'connected' | 'disconnected';
}

export interface MIDINoteEvent {
    type: 'noteOn' | 'noteOff';
    pitch: number; // MIDI note number
    velocity: number;
    timestamp: number; // Original timestamp in milliseconds
    compensatedTimestamp?: number; // Timestamp with latency compensation applied (for timing evaluation)
}

export interface MIDILatencyConfig {
    enabled: boolean;
    offsetMs: number; // Default: 25ms - anticipates MIDI input by this amount
    lastCalibrated?: Date;
}

export interface MIDIConnectionStatus {
    hasAccess: boolean;
    isSupported: boolean;
    devices: MIDIInputDevice[];
    selectedDevice: string | null;
    error?: string;
}

// Raw MIDI message structure
export interface MIDIMessage {
    data: Uint8Array;
    timestamp: DOMHighResTimeStamp;
}
