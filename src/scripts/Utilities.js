export function ParseJWT(token) {
    let chunk = token.split('.')[1];
    let base64 = chunk.replace(/-/g, '+').replace(/_/, '/');
    let payload = decodeURIComponent(atob(base64));

    return JSON.parse(payload);
}