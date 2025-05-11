import "./StockMain.css";
import NavBar from "../components/NavBar";
import Table from "../components/Table";

function StockMain() {
  return (
    <>
      <NavBar />
      <div className="wrapper-main">
        <h1 className="heading-main ">Estoque</h1>
        <div className="wrapper-product-actions">
          <input
            type="search"
            className="search-product body-regular"
            placeholder="Procurar produto..."
          />
          <button className="add-product button-semibold">
            Adicionar produto
          </button>
        </div>
        <Table />
      </div>
    </>
  );
}

export default StockMain;
