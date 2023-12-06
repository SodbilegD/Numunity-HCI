const apiUrl = "https://api.jsonbin.io/v3/b/656027a554105e766fd4532b";

export async function fetchData() {
    try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-Master-Key' : '$2a$10$J8t7992aOYOEYTbS2N2Yo.wwBMKynfbjYoCPPAMqXIWEPna6RZr2O'
          }
        });
        const data = await response.json();
        console.log("Succeed");
        console.log(data.record);
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}
