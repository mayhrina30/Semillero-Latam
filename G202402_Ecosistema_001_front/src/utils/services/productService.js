import { Axios } from "axios";

export async function getPosts({ token }) {
  const response = await fetch(`http://localhost:8080/publication/get-all`, {
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
export async function getPostsActives() {
  const response = await fetch(`http://localhost:8080/publication/actives`, {
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
export async function getPostById({id, token}) {
  const response = await fetch(`http://localhost:8080/publication/get?id=${id}`, {
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
export async function updateViews({ id, token }) {
  const response = await fetch(
    `http://localhost:8080/publication/update-view?id=${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).catch((error) => {
    console.log(error);
  });
}
export async function createPost({ post, email, token }) {
  const response = await fetch(
    `http://localhost:8080/publication/create?email=${email}`,
    {
      method: "POST",
      body: JSON.stringify({
        title: post.titleInput,
        description: post.descriptionInput,
        deleted: false,
        numberOfViews: 1,
      }),
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
  console.log(response)
  const valores = await response.json();
  return valores
}
export async function putPost({ post, token }) {
  const response = await fetch(`http://localhost:8080/publication/update`, {
    method: "PUT",
    body: JSON.stringify({
      id: post.id,
      title: post.title,
      description: post.description,
      deleted: false,
      numberOfViews: post.numberOfViews
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
export async function createImage({ file, token, publicationId }) {
  const response = await fetch(`http://localhost:8080/image/upload/publication?publicationId=${publicationId}&height=null&width=null`, {
    method: "POST",
    body: file,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => {
    console.log(error);
  });
  if(response.ok == false){
    return response.ok
  }
  if(response.ok == false){
    return response.ok
  }
  console.log(response);
  const valores = await response.json();
  return valores
}
export async function deletePost({ idPost, token }) {
  const response = await fetch(
    `http://localhost:8080/publication/delete?id=${idPost}`,
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
  console.log(response);
}
export async function deleteImagePost({ idImage, token }) {
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
