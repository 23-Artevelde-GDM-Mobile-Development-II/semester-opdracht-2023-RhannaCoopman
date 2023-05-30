import useFetch from "../../hooks/useFetch";

const HousesOverview = () => {
  const {
    isLoading,
    error,
    invalidate,
    data: houses,
  } = useFetch("/houses");
 
  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <p>loading...</p>;
  }

  const handleDeleteSuccess = () => {
    invalidate();
  };

  return (
    <>
      <div className="flex flex-end">
        {houses.map((house) => (
          <h2>{house.name}</h2>
        ))}
      </div>

    </>
  );
};

export default HousesOverview;


