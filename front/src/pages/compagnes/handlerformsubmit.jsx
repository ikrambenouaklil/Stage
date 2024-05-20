const handleFormSubmit = async (
  id,
  newBesoin,
  setBesoins,
  setError,
  setOpen
) => {
  try {
    const response = await fetch(`http://localhost:3010/compagnes/besoin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newBesoin }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const newBesoinData = await response.json();
    setBesoins((prevBesoins) => [...prevBesoins, newBesoinData]);

    newBesoin({
      item: "",
      valorisation: "",
      quantité: "",
      duréeContrat: "",
      compagne: id 
    });

    setOpen(false);
  } catch (error) {
    setError(error.message);
  }
};

export default handleFormSubmit;
