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
        console.log(data);
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}

export async function sendDataToJsonBin(data) {
  const response = await fetch(apiUrl, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "X-Master-Key":
                  "$2a$10$J8t7992aOYOEYTbS2N2Yo.wwBMKynfbjYoCPPAMqXIWEPna6RZr2O",
          },
          body: JSON.stringify(data),
      }
  );

  if (!response.ok) {
      throw new Error('Failed to send data to jsonbin.io. Status: ${response.status}');
  }
}