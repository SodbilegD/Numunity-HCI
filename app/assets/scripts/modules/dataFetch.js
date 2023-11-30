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
        console.log(jsonData);
        return jsonData;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


// export async function sendDataToJsonBin(data) {
//     const response = await fetch(
//         https://api.jsonbin.io/v3/b/6555f2b712a5d376599a3eff,
//         {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 "X-Master-Key":
//                     "$2a$10$k9ZU.RdKDhJKc1mSZbYAquTuoot3czlNcCThcZWMl.H82OUpkPhlC",
//             },
//             body: JSON.stringify(data),
//         }
//     );

//     if (!response.ok) {
//         throw new Error(
//             Failed to send data to jsonbin.io. Status: ${response.status}
//         );
//     }
// }