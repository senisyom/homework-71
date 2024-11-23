import ClientDishes from "./ClientDishes";
import Total from "./Total/Total";

const ClientPage = () => {
  return (
    <div>
      <ClientDishes />

      <div className="container-sm" style={{ maxWidth: "700px" }}>
        <hr />
        <Total />
      </div>
    </div>
  );
};

export default ClientPage;
