import React, { useState } from "react";

const ProductSelection = ({ products, selectedProducts, onSelectionChange, quantities, updateQuantity }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // ✅ Open and close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // ✅ Handle checkbox selection
  const handleCheckboxChange = (productId) => {
    const updatedSelection = selectedProducts.some((p) => p.id === productId)
      ? selectedProducts.filter((p) => p.id !== productId) // Remove if unchecked
      : [...selectedProducts, { ...products.find((p) => p.id === productId), quantity: quantities[productId] || 1 }]; // Add if checked

    onSelectionChange(updatedSelection);
  };

  return (
    <div>
      {/* Search and Add Button */}
      <div className="row">
        <div className="col p-3">
          <a className="search-input-wrapper" onClick={openModal}>
            <div className="ae-search-container">
              <i className="fa-solid fa-magnifying-glass"></i> Search and add to your order instantly...
            </div>
          </a>
        </div>
      </div>

      {/* Product Selection Modal */}
      {isModalOpen && (
        <div className="custom-modal active">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-container">
            <div className="modal-content form_section">
              <h6>Add Items</h6>

              {/* Search Bar */}
              <div className="search-input-wrapper gap-2 d-flex justify-content-between">
                <div className="ae-search-container col">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input
                    type="text"
                    className="ae-search-input"
                    placeholder="Search items..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
              </div>

              {/* Product List */}
              <div className="item_container">
                <table className="select_items_table">
                  <tbody>
                    {products
                      .filter((product) =>
                        product.name.toLowerCase().includes(searchText.toLowerCase())
                      )
                      .map((product) => (
                        <tr key={product.id}>
                          <td className="col-1 text-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={selectedProducts.some((p) => p.id === product.id)}
                              onChange={() => handleCheckboxChange(product.id)}
                            />
                          </td>
                          <td className="col-3">
                            <label htmlFor={product.id}>
                              <img src={product.imageUrl} alt={product.name} />
                            </label>
                          </td>
                          <td>
                            <label htmlFor={product.id} className="d-flex flex-column">
                              <span className="form-label">{product.name}</span>
                              <s>₹{product.originalPrice}</s>
                              <span>₹{product.price}</span>
                            </label>
                          </td>
                          <td className="col-2">
                            <div className="quantity-control">
                              <button
                                className="btn a-btn-primary qty-btn"
                                onClick={() => updateQuantity(product.id, (quantities[product.id] || 1) - 1)}
                              >
                                -
                              </button>
                              <input
                                type="text"
                                className="form-control qty-input"
                                value={quantities[product.id] || 1}
                                onChange={(e) => updateQuantity(product.id, e.target.value)}
                              />
                              <button
                                className="btn a-btn-primary qty-btn"
                                onClick={() => updateQuantity(product.id, (quantities[product.id] || 1) + 1)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Save & Cancel Buttons */}
              <div className="btn-sack">
                <button className="a-btn-primary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSelection;
