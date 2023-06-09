import React, { useEffect, useState } from 'react';
import { Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { purchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const purchases = useSelector(state => state?.purchases);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    dispatch(purchasesThunk());
  }, []);

  // Obtener las compras para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = purchases.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(purchases.length / itemsPerPage);

  // Función para cambiar a la página siguiente
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para cambiar a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div id="purchases">
      <h1>My Purchases</h1>
      <ListGroup>
        {currentItems.map(e => (
          <ListGroup.Item key={e?.id}>
            <Row>
              <h4>{e.createdAt}</h4>
              <br />
              <Col
                style={{ cursor: 'pointer' }}
                md={6}
                key={e.id}
                onClick={() => navigate(`/products/${e.productId}/`)}
              >
                <div>
                  <p>{e.product.title}</p>
                  <p>${e.product.price}</p>
                </div>
              </Col>
              <p>{e.quantity}</p>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className="pagination">
        <button
          className="btn btn-primary"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: Math.min(3, totalPages) }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              className={`btn btn-primary ${pageNumber === currentPage ? 'active' : ''}`}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          className="btn btn-primary"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Purchases;
