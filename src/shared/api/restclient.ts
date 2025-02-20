export const getData = async <T>(endpoint: string): Promise<T> => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const token = process.env.EXPO_PUBLIC_API_KEY;
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
