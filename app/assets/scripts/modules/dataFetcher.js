export async function fetchData() {
    try {
        const response = await fetch(
            `https://api.jsonbin.io/v3/b/656027a554105e766fd4532b`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': '$2a$10$J8t7992aOYOEYTbS2N2Yo.wwBMKynfbjYoCPPAMqXIWEPna6RZr2O',
                },
            }
        );
        const jsonData = await response.json();
        //console.log(jsonData);
        return jsonData;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}