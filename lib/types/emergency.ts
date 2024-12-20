export type EmergencyData = {
    id: string;
    audio: string;
    video: string;
}

export type ProcessedEmergency = {
    id: string;
    transcription: string;
    severity: string;
    triage: string;
    dispatch: string;
}