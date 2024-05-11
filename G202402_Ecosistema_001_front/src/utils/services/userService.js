export async function getUserBack({ email, token }) {
  const response = await fetch(`http://localhost:8080/user/me?email=${email}`, {
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
export async function setLocation({ token, latitude, longitude, email }) {
  const response = await fetch(
    `http://localhost:8080/location?latitude=${latitude}&length=${longitude}&email=${email}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).catch((error) => {
    console.log(error);
  });
  if (response.ok == false) {
    return response.ok;
  }
  const valores = await response.json();
  return valores;
}
