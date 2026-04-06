//api/auth/logout.js
export default function logout() {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    window.location.href = '/auth/login';
}