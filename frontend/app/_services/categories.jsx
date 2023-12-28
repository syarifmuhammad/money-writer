async function insert(data) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })

    const result = await res.json()
    return result
}

export default { insert }