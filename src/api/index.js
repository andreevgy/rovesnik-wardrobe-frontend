
export const takeNumber = async (number, token) => {
    const res = await fetch(`${process.env.REACT_APP_API_HOST}/takeNumber/${number}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
    });
    // Todo: костыль
    if (res.status === 401) {
        throw res;
    }
    if (res.status === 200) {
        return res.json();
    }
    throw res;
}

export const getCurrentNumber = async (token) => {
    const res = await fetch(`${process.env.REACT_APP_API_HOST}/getCurrentNumber`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    if (res.status === 404) {
        throw new Error('Вы не закрепили за собой номерок');
    }
}

export const returnNUmber = async (token) => {
    return fetch(`${process.env.REACT_APP_API_HOST}/returnNumber`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}