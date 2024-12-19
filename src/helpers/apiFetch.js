export default async (method, route, body = null) => {
    const options = {
        method,
        headers: {
            Accept: 'application/json',
        }
    };

    const token = localStorage.getItem('user-token');

    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`http://localhost/laravel-edu/public/api-kosmos${route}`, options);

    if (response.status === 401) {
        localStorage.removeItem('user-token');
        window.location.replace('/auth');
    }
    let result = null;
    try {
        result = await response.json();
    } catch (err) {
    }

    return result;
}