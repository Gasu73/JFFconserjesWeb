// Importar Firebase desde la CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD8K2lcKrDqpF4GgpjQnB8BVoJrQ9F2Ui4",
  authDomain: "jffconserjes.firebaseapp.com",
  databaseURL: "https://jffconserjes-default-rtdb.firebaseio.com",
  projectId: "jffconserjes",
  storageBucket: "jffconserjes.firebasestorage.app",
  messagingSenderId: "708146944105",
  appId: "1:708146944105:web:1d3e7fdb5f137954eaaaf8",
  measurementId: "G-MNSSE0PBK5"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Esperar que el DOM esté cargado antes de asignar eventos
document.addEventListener("DOMContentLoaded", () => {
  const botonLogin = document.getElementById("btn-login");
  if (botonLogin) {
    botonLogin.addEventListener("click", login);
  }
});

// Función de login
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensaje = document.getElementById("mensaje");

  // Validar campos
  if (!email || !password) {
    mensaje.style.color = "orange";
    mensaje.textContent = "⚠️ Por favor, completa todos los campos.";
    return;
  }

  // Iniciar sesión con Firebase
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      mensaje.style.color = "green";
      mensaje.textContent = "✅ Inicio de sesión exitoso. Redirigiendo...";

      // Redirige a home.html después de 1 segundo
      setTimeout(() => {
        window.location.href = "../home/home.html";
      }, 1000);
    })
    .catch((error) => {
      mensaje.style.color = "red";
      if (error.code === "auth/wrong-password") {
        mensaje.textContent = "❌ Contraseña incorrecta.";
      } else if (error.code === "auth/user-not-found") {
        mensaje.textContent = "❌ Usuario no encontrado.";
      } else if (error.code === "auth/invalid-email") {
        mensaje.textContent = "❌ Correo inválido.";
      } else {
        mensaje.textContent = `❌ Error: ${error.message}`;
      }
    });
}
