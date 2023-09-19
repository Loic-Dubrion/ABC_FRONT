import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

interface ConvertState {}

const initialState: ConvertState = {};

export const convertToExcel = createAsyncThunk(
  'Convert reducer/Converting file to excel',
  async (sequenceId: string) => {
    try {
      // Remplacez 'axiosInstance' par votre instance Axios configurée correctement
      const response = await axiosInstance.get(
        `/user/${localStorage.getItem('id')}/sequence/excel/${sequenceId}`,
        {
          responseType: 'blob', // Spécifiez que la réponse est un blob (fichier)
        }
      );

      // Créez un objet Blob à partir de la réponse
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Créez un objet URL pour le blob
      const blobUrl = URL.createObjectURL(blob);

      // Utilisez 'blobUrl' pour télécharger le fichier Excel ou faire ce que vous voulez avec
      // Par exemple, vous pouvez utiliser une bibliothèque de téléchargement de fichiers pour déclencher le téléchargement
      // Voici un exemple avec la bibliothèque 'file-saver'
      // import { saveAs } from 'file-saver';
      // saveAs(blob, 'nom-du-fichier.xlsx');

      // Retournez le blobUrl ou effectuez toute autre action souhaitée
      window.open(blobUrl, '_blank');
    } catch (error) {
      console.error('Erreur :', error);
      // Vous pouvez gérer l'erreur ici en lançant une action Redux, par exemple
      throw error; // Vous pouvez choisir de propager l'erreur ou de la gérer différemment
    }
  }
);
export const convertToPdf = createAsyncThunk(
  'Convert reducer/Converting file to pdf',
  async (sequenceId: string) => {
    try {
      // Remplacez 'axiosInstance' par votre instance Axios configurée correctement
      const response = await axiosInstance.get(
        `/user/${localStorage.getItem('id')}/sequence/pdf/${sequenceId}`,
        {
          responseType: 'blob', // Spécifiez que la réponse est un blob (fichier)
        }
      );

      // Créez un objet Blob à partir de la réponse
      const blob = new Blob([response.data], {
        type: 'application/pdf',
      });

      // Créez un objet URL pour le blob
      const blobUrl = URL.createObjectURL(blob);

      // Utilisez 'blobUrl' pour télécharger le fichier Excel ou faire ce que vous voulez avec
      // Par exemple, vous pouvez utiliser une bibliothèque de téléchargement de fichiers pour déclencher le téléchargement
      // Voici un exemple avec la bibliothèque 'file-saver'
      // import { saveAs } from 'file-saver';
      // saveAs(blob, 'nom-du-fichier.xlsx');

      // Retournez le blobUrl ou effectuez toute autre action souhaitée
      window.open(blobUrl, '_blank');
    } catch (error) {
      console.error('Erreur :', error);
      // Vous pouvez gérer l'erreur ici en lançant une action Redux, par exemple
      throw error; // Vous pouvez choisir de propager l'erreur ou de la gérer différemment
    }
  }
);

const convertReducer = createReducer(initialState, (builder) => {
  builder;
});

export default convertReducer;
