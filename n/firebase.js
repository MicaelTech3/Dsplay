import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBzeagfK8M3Nq9MLAg06jICwAEFOiL1hnU",
    authDomain: "controle-tvs.firebaseapp.com",
    projectId: "controle-tvs",
    storageBucket: "controle-tvs.firebasestorage.app",
    messagingSenderId: "381219714212",
    appId: "1:381219714212:web:9c05fffdc33ed4a97ce231"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Obtenha a instância do Firestore
const db = getFirestore(app);

// Função para adicionar um vídeo ao Firestore
async function saveVideoUrl(floor, url) {
    try {
        const docRef = await addDoc(collection(db, "videos"), {
            floor: floor,
            url: url
        });
        console.log("Vídeo salvo com ID: ", docRef.id);
    } catch (e) {
        console.error("Erro ao adicionar documento: ", e);
    }
}

// Função para carregar vídeos do Firestore
function loadVideos() {
    const unsubscribe = onSnapshot(collection(db, "videos"), (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log(data.url); // Aqui você pode adicionar o vídeo à TV
        });
    });
}

// Chama a função para carregar vídeos
loadVideos();
