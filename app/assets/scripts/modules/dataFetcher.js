export async function fetchData() {
    try {
        const response = await fetch('https://api.jsonbin.io/v3/b/6544865f0574da7622c15ac9');
        const data = await response.json();
        console.log("Succeed");
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}