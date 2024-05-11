export async function getProvincesBack({token}) {
    const response = await fetch(`http://localhost:8080/province/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
    });
    if (response.ok == false) {
      return response.ok;
    }
    const valores = await response.json();
    return valores;
  }
  