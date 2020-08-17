export const httpGetAllItems = async (path, method, token) => {
  let response;
  try {
    response = await fetch(path, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }

  return response.json();
};

export const httpFetch = async (path, method, token = null, data = null) => {
  let response;
  try {
    response = fetch(path, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }

  return (await response).json();
};