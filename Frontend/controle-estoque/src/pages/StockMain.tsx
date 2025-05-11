import "./StockMain.css";
import NavBar from "../components/NavBar";

function StockMain() {
  return (
    <>
      <NavBar />
      <div className="wrapper-main">
        <h1 className="heading-main">Estoque</h1>
        <input type="search" placeholder="Procurar produto..." />
        <button>Adicionar produto</button>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Valor</th>
              <th>Validade</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Coca Cola</td>
              <td>86 Latas</td>
              <td>R$ 5.90</td>
              <td>12/08/2025</td>
              <td>Em Estoque</td>
              <td>...</td>
            </tr>
            <tr>
              <td>Farinha</td>
              <td>15 Quilos</td>
              <td>R$ 11.50</td>
              <td>22/10/2025</td>
              <td>Acabando</td>
              <td>...</td>
            </tr>
            <tr>
              <td>Cerveja</td>
              <td>0 Garrafas</td>
              <td>R$ 25.00 </td>
              <td>15/06/2025</td>
              <td>Sem Estoque</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default StockMain;
