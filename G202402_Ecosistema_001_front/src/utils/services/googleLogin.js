export async function userGoogle({ authorizationCode }) {
  const response = await fetch(`http://localhost:8080/user/register?token=${authorizationCode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error)=>{
    console.log(error)
  });
    if(response.status == 400){
      return false
    }
    const valores = await response.json();
    return valores;
}
export async function LoginBack({ userInfo }) {
  const response = await fetch(`http://localhost:8080/user/login?email=${userInfo.email}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error)=>{
    console.log(error)
  });
  if(response.ok == false){
    return response.ok
  }
  const valores = await response.json();
  return valores;
}
