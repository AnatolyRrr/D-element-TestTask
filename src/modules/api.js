export const submit = async (url, form) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: new FormData(form)
    });

    if(!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`)
    }
        
    return await response.json();
};