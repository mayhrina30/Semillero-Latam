
export async function getProvidersBack({ token }) {
  const response = await fetch(`http://localhost:8080/provider/get-all`, {
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
export async function getProviderByCategory({ id }) {
  console.log(id);
  const response = await fetch(
    `http://localhost:8080/provider/accepted-by-category?categoryId=${id}`,
    {
      method: "GET",
      headers: {
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
export async function createImageProvider({ file, token, providerId }) {
  const response = await fetch(
    `http://localhost:8080/image/upload/provider?providerId=${providerId}&height=null&width=null`,
    {
      method: "POST",
      body: file,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).catch((error) => {
    console.log(error);
  });
  if (response.ok == false) {
    return response.ok;
  }
  if (response.ok == false) {
    return response.ok;
  }
  console.log(response);
  const valores = await response.json();
  return valores;
}
export async function createProvider({ provider, email, token,categoryData, provinceData, countryData }) {
  const response = await fetch(
    `http://localhost:8080/provider/create?email=${email}`,
    {
      method: "POST",
      body: JSON.stringify({
        name: provider.name,
        description: provider.description,
        deleted: false,
        instagram: provider.instagram,
        facebook: provider.facebook,
        email: provider.email,
        phone: provider.phone,
        categoryId: categoryData.id,
        countryId: countryData.id,
        provinceId: provinceData.id,
      }),
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
  console.log(response);
  const valores = await response.json();
  return valores;
}
export async function putProvider({ id, provider, token, email }) {
  const response = await fetch(`http://localhost:8080/provider/update?email=${email}`, {
    method: "PUT",
    body: JSON.stringify({
      id:id,
      name: provider.name,
      description: provider.description,
      deleted: false,
      instagram: provider.instagram,
      facebook: provider.facebook,
      email: provider.email,
      phone: provider.phone,
      categoryId: provider.category.id,
      countryId: provider.country.id,
      provinceId: provider.province.id,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.log(error);
  });
  if(response.ok == false){
    return response.ok
  }
  console.log(response);
  const valores = await response.json();
  return valores
}
export async function deleteImageProvider({ idImage, token }) {
  const response = await fetch(
    `http://localhost:8080/image/delete?id=${idImage}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).catch((error) => {
    console.log(error);
  });
  if(response.ok == false){
    return response.ok
  }
  console.log(response);
  return response
}
export async function getProviderById({id, token}) {
  const response = await fetch(`http://localhost:8080/provider/get?id=${id}`, {
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
export async function getProvidersSearch({search}) {
console.log(search);
  const response = await fetch(`http://localhost:8080/provider/search?name=${search.search}`, {
    method: "GET",
    headers: {
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
export async function getProvidersByLocation({email, token}) {

  const response = await fetch(`http://localhost:8080/provider/location?email=${email}`, {
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
export async function putProviderState({ id, state, feedback, token}) {
  console.log(id, state, feedback, token);
  const response = await fetch(`http://localhost:8080/provider/update-state?id=${id}`, {
    method: "PUT",
    body: JSON.stringify({
      state:state,
      feedback: feedback,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.log(error);
  });
  if(response.ok == false){
    console.log(response);
    return response.ok
  }
  console.log(response);
  const valores = await response.json();
  return valores
}