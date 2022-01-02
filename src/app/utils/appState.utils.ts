import { AppState } from "../models/AppState";

export const appStateSelector = (store: any): any => store.getItem('appState') ? JSON.parse((store.getItem('appState') || '')) : null;
export const userIdSelector = (appState: AppState): number => appState.userId;
export const firstnameSelector = (appState: AppState): string => appState.firstname;
export const myListSelector = (appState: AppState): number[] => appState.myList.map(idStr => Number(idStr));